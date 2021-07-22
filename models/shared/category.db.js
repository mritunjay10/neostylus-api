const db = require('@models');

const Model = db.categories;

Model.hasMany(db.subCategories,  { sourceKey: 'id', foreignKey:'category', as:'subCategoriesData' });
Model.hasMany(db.courses,  { sourceKey: 'id', foreignKey:'course', as:'coursesData' });

exports.create = async (datum)=>{
  try{

      const data  = await Model.create(datum);

      return { status: true, data, message: 'Created category!' };
  }
  catch (e){
      return { status: false, message: e.message || 'Unable to create category', pagination: null }
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