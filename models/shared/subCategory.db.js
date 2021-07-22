const db = require('@models');

const Model = db.subCategories;

Model.belongsTo(db.categories,  { sourceKey: 'id', foreignKey:'category', as:'categoryDatum' });

exports.create = async (datum)=>{
  try{

      const data  = await Model.create(datum);

      return { status: true, data, message: 'Created category!' };
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
            include:[
                {
                    include: db.categories,
                    as: 'categoryDatum',
                    attributes: ['id','title'],
                    where: { status: true, deleted: false, }
                }
            ]
        });

        return { status: true, data, message: 'Sub-categories!' };
    }
    catch (e){
        return { status: false, message: e.message || 'Unable to fetch categories', pagination: null }
    }
};