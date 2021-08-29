const { response } = require('@utils');

exports.book = async (req, res, next)=>{

    try{

        const { orderId, course, dates, slot } = req.body;

        if(!orderId) throw { code: 409, message: 'Invalid order id' };

        if(!course) throw { code: 409, message: 'Invalid course' };

        if(!slot) throw { code: 409, message: 'Invalid slot' };

        if(!dates) throw { code: 409, message: 'Invalid dates' };

        if(dates.length<=0) throw { code: 409, message: 'Invalid date!' };

        next()
    }
    catch (e){
        response.error(res, e)
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
