const { response } = require('@utils');
const { slotDb, courseDb } = require('@models/shared');


exports.id = async (req, res, next)=>{

    try{

        const { id } = req.params;

        if(!id) throw { code: 409, message: 'Invalid slot!' };

        next()
    }
    catch (e){
        response.error(res, e);
    }
};

exports.create = async (req, res, next) =>{

    try{

        const { course, startTime, endTime, } = req.body;

        if(!course) throw { code: 409, message: 'Invalid course!' };

        if(!startTime) throw { code: 409, message: 'Invalid start time!' };

        if(!endTime) throw { code: 409, message: 'Invalid end time!' };

        const { status: slotCountStatus, data: slotCountData, message: slotCountMessage, } = await slotDb.count({
            startTime: {
                [global.Op.gte]: startTime
            },
            endTime: {
                [global.Op.lte]: endTime
            }
        });

        if(!slotCountStatus) throw { code: 409, message: slotCountMessage };

        if(slotCountData>0) throw { code: 409, message: 'Invalid start-time and end-time' };

        const { status: courseStatus, data: courseData, message: courseMessage } = await courseDb.get({ id: course });

        if(!courseStatus) throw { code: 409, message: courseMessage };

        req.category = courseData.category;
        req.subCategory = courseData.subCategory;

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
