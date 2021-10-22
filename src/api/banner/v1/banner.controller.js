const { response } = require('@utils');
const { bannerDb } = require('@models');

exports.bannerCreate = async (req, res) => {
    
  try{
    const banners = req.banners;

    const { status, message, data } = await bannerDb.create(banners);

    if(!status) throw { code: 503, message }

    response.success(res, { code: 201, message, data, pagination: null  })
  }
  catch (e){
    response.error(res, e)
  }
}