const { response } = require('@utils')

exports.bannerCreate = (req, res, next) => {

  try{
    req.banners = [];
    next()
  }
  catch (e){
    response.error(res, e)
  }
}