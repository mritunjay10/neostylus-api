const { response } = require('@utils');
const { slotDb } = require('@models/shared');


exports.list = async (req, res,)=>{

    try{

        const { filterBy, search } = req.body;
        let where = {};

        if(search){

            if(!['course']
                    .includes(filterBy)) throw { code: 409, message: 'Invalid filter by' };

            where[filterBy] = {
                [global.Op.like]: '%'+search+'%',
            };
        }

        where['status'] = true;
        where['deleted'] = false;

        const { status, data, message, pagination } = await slotDb.list({
            page: req.body.pagination.page,
            rowsPerPage: req.body.pagination.rowsPerPage,
            sortBy: req.body.pagination.sortBy,
            descending: req.body.pagination.descending,
            where: where,
        });

        if(!status) throw { message }

        response.success(res, { code: 200,  message, data, pagination});

    }
    catch (e) {
        response.error(res, e);
    }
};