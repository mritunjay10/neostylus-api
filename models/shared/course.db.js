const db = require('@models');

const Model = db.courses;

const rawQueries = require('./rawQuries');

Model.belongsTo(db.categories,  { sourceKey: 'id', foreignKey:'category', as:'courseCategoryDatum' });
Model.belongsTo(db.subCategories,  { sourceKey: 'id', foreignKey:'subCategory', as:'courseSubCategoryDatum' });

Model.hasMany(db.bookings,  { sourceKey: 'id', foreignKey:'course', as:'bookingCourseDatum' });

exports.create = async (datum)=>{
  try{

    const data  = await Model.create(datum);

    return { status: true, data, message: 'Created course!' };
  }
  catch (e){
    return { status: false, message: e.message || 'Unable to create course', pagination: null }
  }
};

exports.list = async (data) =>{

  try{

    data.where['deleted'] = false;
    data.where['status'] = true;

    const datum = await Model.findAndCountAll({
      where: data.where,
      offset: ((parseInt(+data.page)) - 1) * parseInt(+data.rowsPerPage),
      limit: parseInt(+data.rowsPerPage),
      include: [
        {
          model : db.categories,
          as: 'courseCategoryDatum',
          attributes: ['id','title'],
        },
        {
          model : db.subCategories,
          as: 'courseSubCategoryDatum',
          attributes: ['id','title', 'imageUrl'],
        },
      ],
      attributes: {
        include: [
          [db.Sequelize.literal(
            rawQueries.slotCount('`courses`.`id`')
          ),
          'slotCount'],
        ],
      },
      order: [
        [data.sortBy, (data.descending === true ? 'DESC' : 'ASC')],
      ],
    });

    const pagination = {
      rowsPerPage: data.rowsPerPage,
      total: datum.count ,
      page: data.page,
      sortBy: data.sortBy,
      descending: data.descending,
    };

    return { status: true, data: datum.rows, pagination , message: 'Courses list' }
  }
  catch (e){

    return { status: false, data: null, message: e.message || 'Unable to fetch courses', pagination: null }
  }
};

exports.get = async (where) => {

  try{

    const data = await Model.findOne({ where });

    return { status: true, data, pagination: null , message: 'Course!' }
  }
  catch (e){
    return { status: false, data: null, message: e.message || 'Unable to fetch courses', pagination: null }
  }
};

exports.delete = async (where) =>{

  try{
    const datum = await Model.update({ deleted: true }, { where });

    return { status: true, data: datum[0], pagination: null , message: 'Deleted successfully' }
  }
  catch (e){
    return { status: false, data: null, message: e.message || 'Unable to delete', pagination: false }
  }
};

exports.update = async (data) =>{

  try{

    let body ={};

    for(let key in data.body) {

      if(data.body.hasOwnProperty(key)){

        if(data.body[key]){
          body[key] = data.body[key];
        }
      }
    }

    const datum = await Model.update(body, { where: data.where });

    return { status: true, data: datum[0], pagination: null , message: 'Updated successfully' }
  }
  catch (e){
    return { status: false, data: null, message: e.message || 'Unable to update', pagination: false }
  }
};