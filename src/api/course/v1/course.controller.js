const { response } = require('@utils');
const { courseDb } = require('@models/shared');


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

        if(req.role === 'User'){
            where['user'] = req.userId;
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