const db = require('@models');
const Model = db.banners;

exports.create = async (data) => {

  try{

    const insert = data.map(datum=> { return { imageUrl: datum } })

    const datum = await Model.bulkCreate(insert)

    return { status: true, data: datum, message: 'Banner created!', pagination: null }
  }
  catch (e){
    return { status: false, data: null, message: 'Unable to create banner!', pagination: null }
  }
}

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

    return { status: true, data: datum.rows, pagination , message: 'Banners list' }
  }
  catch (e){

    return { status: false, data: null, message: e.message, pagination: null }
  }
};