const db = require('@models');
const Model = db.banners;

exports.create = async (data) => {

  try{

    const insert = data.map(datum=> { return { imageUrl: datum } })

    const datum = await Model.bulkCreate(insert)

    return { status: false, data: datum, message: 'Banner created!', pagination: null }
  }
  catch (e){
    return { status: false, data: null, message: 'Unable to create banner!', pagination: null }
  }
}