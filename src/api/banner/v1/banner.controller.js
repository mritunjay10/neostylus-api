const { response } = require('@utils');

exports.bannerCreate = (req, res) => {
    
  try{
    const banners = req.banners;
    console.log(banners)
    response.success(res, { code: 200, message: '', data: banners, pagination: null  })
  }
  catch (e){
    response.error(res, e)
  }
}