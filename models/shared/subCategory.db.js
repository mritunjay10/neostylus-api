const db = require('@models');

const Model = db.subCategories;

Model.belongsTo(db.categories,  { sourceKey: 'id', foreignKey:'category', as:'categoryDatum' });
Model.hasMany(db.courses,  { sourceKey: 'id', foreignKey:'subCategory', as:'coursesData' });


exports.create = async (datum)=>{
  try{

      const data  = await Model.create(datum);

      return { status: true, data, message: 'Created sub-category!' };
  }
  catch (e){
      return { status: false, message: e.message || 'Unable to create category', pagination: null }
  }
};


exports.all = async (where)=>{

    try{

        where['status'] = true;
        where['deleted'] = false;

        const data = await Model.findAll({
            where,
            attributes: ['id','title',],
            include:{
                model: db.categories,
                as: 'categoryDatum',
                attributes:['id','title',],
            },
        });

        return { status: true, data, message: 'Sub-categories!', pagination: null };
    }
    catch (e){
        return { status: false, message: e.message || 'Unable to fetch categories', pagination: null }
    }
};


exports.list = async(data)=>{

    try{

        data.where['deleted'] = false;
        data.where['status'] = true;

        const datum = await Model.findAndCountAll({
            where: data.where,
            offset: ((parseInt(+data.page)) - 1) * parseInt(+data.rowsPerPage),
            limit: parseInt(+data.rowsPerPage),
            order: [
                [data.sortBy, (data.descending === true ? 'DESC' : 'ASC')],
            ],
            include: [{
                model: db.categories,
                as: 'categoryDatum',
                where: { status: true, deleted: false }
            }]
        });

        const pagination = {
            rowsPerPage: data.rowsPerPage,
            rowsNumber: datum.count ,
            page: data.page,
            sortBy: data.sortBy,
            descending: data.descending,
        };

        return { status: true, data: datum.rows, pagination , message: 'Sub-categories list' }
    }
    catch (e){

        return { status: false, data: null, message: e.message, pagination: null }
    }

};