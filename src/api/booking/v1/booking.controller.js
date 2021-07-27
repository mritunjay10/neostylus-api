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