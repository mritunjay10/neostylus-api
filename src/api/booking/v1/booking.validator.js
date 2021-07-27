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