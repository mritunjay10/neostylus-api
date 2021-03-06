const { response } = require('@utils');
const { courseDb } = require('@models/shared');


exports.create = async (req, res)=>{

  try{

    const {category, subCategory, title,
      description, totalSessions, sessionDuration,
      costPerSessionFaceToFaceINR, costPerSessionFaceToFaceINT,
      costPerSessionOnlineINR, costPerSessionOnlineINT,
      meta } = req.body;

    console.log(req.coverImage)
    console.log(req.image)

    const { status, data, message } = await courseDb.create( {
      category, subCategory, title,
      imageUrl: req.image,
      coverImageUrl: req.coverImage,
      description, totalSessions, sessionDuration,
      costPerSessionFaceToFaceINR, costPerSessionFaceToFaceINT,
      costPerSessionOnlineINR, costPerSessionOnlineINT,
      meta,
    });

    if(!status) throw { message };

    response.success(res, { code: 201, status, message, data , pagination: null });
  }
  catch (e){
    response.error(res, e);
  }

};

exports.list = async (req, res)=>{

  try{

    const { filterBy, search, strict } = req.body;
    let where = {};

    if(search){

      if(!['title','category']
        .includes(filterBy)) throw { code: 409, message: 'Invalid filter by' };

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

    const { status, data, message, pagination } = await courseDb.list({
      page: req.body.pagination.page,
      rowsPerPage: req.body.pagination.rowsPerPage,
      sortBy: req.body.pagination.sortBy,
      descending: req.body.pagination.descending,
      where: where,
    });

    if(!status) throw { message };

    response.success(res, { code: 200, message, data, pagination});

  }
  catch (e) {
    response.error(res, e);
  }
};

exports.delete = async (req, res, )=>{

}

exports.update = async (req, res, )=>{

  try{

    const { id } = req.params;
    const { category, subCategory, title,
      description, totalSessions, sessionDuration,
      costPerSessionFaceToFaceINR, costPerSessionFaceToFaceINT,
      costPerSessionOnlineINR, costPerSessionOnlineINT,
      meta } = req.body;

    const { status, data, message } = await courseDb.update({
      where: { id },
      body: { category, subCategory, title,
        description, totalSessions, sessionDuration,
        costPerSessionFaceToFaceINR, costPerSessionFaceToFaceINT,
        costPerSessionOnlineINR, costPerSessionOnlineINT,
        meta },
    })

    if(!status) throw { message };

    response.success(res, { code: 200, message, data, pagination: null});
  }
  catch (e) {
    response.error(res, e);
  }
}