const { bookingDb } = require('@models/shared');

const { response } = require('@utils');

exports.book = async (req, res) =>{

    try{

        const insert = [];

        const { orderId, course, dates, slot } = req.body;

        dates.map(date=>{
            insert.push({
                orderId,
                course,
                date,
                slot,
                user: req.userId
            })
        });

        const { status, message, data } = await bookingDb.create(insert);

        if(!status) throw { message };

        response.success(res, { code: 200,  message, data, pagination: null});
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

            if(!['title',]
                .includes(filterBy)) throw { code: 409, message: 'Invalid filter by' };

            where[filterBy] = {
                [global.Op.like]: '%'+search+'%',
            };
        }

        if(req.role !=='Admin'){
            where['user'] = req.userId;
        }

        where['status'] = true;
        where['deleted'] = false;

        const { status, data, message, pagination } = await bookingDb.list({
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
