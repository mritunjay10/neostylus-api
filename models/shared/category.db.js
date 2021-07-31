const db = require('@models');

const Model = db.categories;

Model.hasMany(db.subCategories,  { sourceKey: 'id', foreignKey:'category', as:'subCategoriesData' });
Model.hasMany(db.courses,  { sourceKey: 'id', foreignKey:'category', as:'coursesData' });

exports.create = async (datum)=>{
  try{

      const data  = await Model.create(datum);

      return { status: true, data, message: 'Created category!' };
  }
  catch (e){
      return { status: false, message: e.message || 'Unable to create category', pagination: null }
  }
};

exports.get = async (where) =>{

    try{

        where['status'] = true;
        where['deleted'] = false;


        const data = await Model.findOne({
            attributes: ['id','title',],
            where,
        });

        return { status: true, data, message: 'Category', pagination: null };
    }
    catch (e){
        return { status: false, message: e.message || 'Unable to fetch categories', pagination: null }
    }
};

exports.all = async ()=>{

    try{

        const data = await Model.findAll({
            attributes: ['id','title',],
            where: { status: true, deleted: false, }
        });

        return { status: true, data, message: 'Categories!' };
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
        });

        const pagination = {
            rowsPerPage: data.rowsPerPage,
            rowsNumber: datum.count ,
            page: data.page,
            sortBy: data.sortBy,
            descending: data.descending,
        };

        return { status: true, data: datum.rows, pagination , message: 'Categories list' }
    }
    catch (e){

        return { status: false, data: null, message: e.message, pagination: null }
    }

};