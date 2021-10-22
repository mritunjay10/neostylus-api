const { response } = require('@utils');

exports.create = (req, res) => {
    
  try{
    const banners = req.banners;

    console.log(banners)
  }
  catch (e){
    response.error(res, e)
  }
}