const { response } = require('@utils');
const { bannerDb } = require('@models/shared');

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

exports.list = async (req, res) =>{

  try{
    const { filterBy, search, strict } = req.body;
    let where = {};

    if(search){

      if(strict){
        where[filterBy] = search;
      }
      else{
        where[filterBy] = {
          [global.Op.like]: '%'+search+'%',
        };
      }
    }

    where['status'] = true;
    where['deleted'] = false;

    const { status, data, message, pagination } = await bannerDb.list({
      page: req.body.pagination.page,
      rowsPerPage: req.body.pagination.rowsPerPage,
      sortBy: req.body.pagination.sortBy,
      descending: req.body.pagination.descending,
      where: where,
    });

    if(!status) throw { message };

    response.success(res, { code: 200, message, data, pagination});
  }
  catch (e){
    response.error(res, e)
  }
}