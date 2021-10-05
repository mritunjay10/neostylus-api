const { response } = require('@utils');
const { categoryDb } = require('@models/shared');

exports.create = async (req, res)=>{

  try{

    const { title } = req.body;

    const { status, data, message } = await categoryDb.create({ title, imageUrl: req.image });

    response.success(res, { code: 200, status, message, data , pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};

exports.all = async (req, res)=>{

  try{

    const { status, data, message } = await categoryDb.all();

    response.success(res, { code: 200, status, message, data , pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};

exports.list = async (req, res,) =>{

  try{

    const { filterBy, search } = req.body;
    let where = {};

    if(search){

      if(!['title']
        .includes(filterBy)) throw { code: 409, message: 'Invalid filter by' };

      where[filterBy] = {
        [global.Op.like]: '%'+search+'%',
      };
    }

    where['status'] = true;
    where['deleted'] = false;

    const { status, data, message, pagination } = await categoryDb.list({
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

exports.update = async (req, res, ) => {

  try{

    const { id } = req.params;
    const { title } = req.body;

    const { status, data, message } = await categoryDb.update({
      where: { id },
      body: { title },
    })

    if(!status) throw { message }

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e);
  }
};
