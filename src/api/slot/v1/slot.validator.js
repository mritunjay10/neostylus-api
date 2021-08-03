const { response } = require('@utils');
const { slotDb } = require('@models/shared');

exports.create = async (req, res, next) =>{

    try{

        const { category, subCategory, course, startTime, endTime, } = req.body;

        if(!category) throw { code: 409, message: 'Invalid category!' };

        if(!subCategory) throw { code: 409, message: 'Invalid sub-category!' };

        if(!course) throw { code: 409, message: 'Invalid course!' };

        if(!startTime) throw { code: 409, message: 'Invalid start time!' };

        if(!endTime) throw { code: 409, message: 'Invalid end time!' };

        const { status, data, message, } = await slotDb.count({ where: {

            startTime: {
                [global.Op.gte]: startTime
            },
            endTime: {
                [global.Op.lt]: endTime
            }

        }});

        console.log(data);

        if(!status) throw { code: 409, message };

        if(data>0) throw { code: 409, message: 'Invalid start-time and end-time' };

        next()
    }
    catch (e){
        response.error(res, e);
    }
};

exports.list = (req, res, next) =>{

    try{

        const { pagination } = req.body;

        const {page, rowsPerPage, sortBy, descending } = pagination;

        if(!pagination) throw { code: 409, message: 'Invalid pagination' };

        if(page<0) throw { code: 409, message: 'Invalid list request' };

        if(rowsPerPage<1) throw { code: 409, message: 'Invalid list count' };

        if(!sortBy) throw { code: 409, message: 'Invalid sort by' };

        if(![true, false].includes(descending)) throw { code: 409, message: 'Invalid list order' };

        next()

    }
    catch (e) {
        response.error(res, e);
    }
};
