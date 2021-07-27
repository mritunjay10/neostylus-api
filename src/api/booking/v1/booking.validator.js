const { response } = require('@utils');

exports.book = async (req, res, next)=>{

    try{

        const { orderId, course, dates, slot } = req.body;

        if(!orderId) throw { message: 'Invalid order id' };

        if(!course) throw { message: 'Invalid course' };

        if(!slot) throw { message: 'Invalid slot' };

        if(dates.length<=0) throw { message: 'Invalid date!' };

        next()
    }
    catch (e){
        response.error(res, e)
    }

};