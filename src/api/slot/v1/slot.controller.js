const { response } = require('@utils');
const { slotDb, bookingDb } = require('@models/shared');

exports.create = async (req, res)=>{

    try{

        const { course, startTime, endTime, } = req.body;

        const { status, data, message, } = await slotDb.create({
            category: req.category,
            subCategory: req.subCategory,
            course, startTime, endTime
        });

        if(!status) throw { message };

        response.success(res, { code: 201,  message, data, pagination: null });

    }
    catch (e){
        response.error(res, e);
    }
};


exports.all = async (req, res) =>{

    try{

        const { filterBy, search } = req.body;

        const where = {};

        if(filterBy){
            where[filterBy] = search;
        }

        const { status, data, message, } = await slotDb.fetch(where);

        if(!status) throw { message };

        response.success(res, { code: 200,  message, data, pagination: null });

    }
    catch (e){
        response.error(res, e);
    }
};

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

        const { status: bookedSlotStatus,
            data: bookedSlotIds,
            message:  bookedSlotMessage } = await bookingDb.bookedCourses({ course: search });


        if(!bookedSlotStatus) throw { message: bookedSlotMessage };

        const ids = [];

        await bookedSlotIds.map(async each=>{
           ids.push(each.slot)
        });

        where['id'] = {
            [global.Op.notIn]: ids,
        };

        const { status, data, message, pagination } = await slotDb.list({
            page: req.body.pagination.page,
            rowsPerPage: req.body.pagination.rowsPerPage,
            sortBy: req.body.pagination.sortBy,
            descending: req.body.pagination.descending,
            where: where,
        });

        if(!status) throw { message };

        response.success(res, { code: 200,  message, data, pagination });

    }
    catch (e) {
        response.error(res, e);
    }
};