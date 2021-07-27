const db = require('@models');

const Model = db.bookings;

exports.create = async (data)=>{

    try{

        await Model.bulkCreate(data);

        return { status: true, data: 1, message: 'Booked successfully!', pagination: null }
    }
    catch (e){
        console.log(e.message)
        return { status: false, data: null, message: 'Unable to book!', pagination: null }
    }
};