const db = require('@models');

const Model = db.bookings;

exports.create = async (data)=>{

    try{

        await Model.bulkCreate(data);

        return { status: true, data: 1, message: 'Booked successfully!', pagination: null }
    }
    catch (e){
        return { status: false, data: null, message: 'Unable to book!', pagination: null }
    }
};

exports.bookingDatesCount = async (where) =>{

    try{

        const datum = await Model.count({ where });

        return { status: true, data: datum[0], message: 'Booking dates!', pagination: null }
    }
    catch (e){
        return { status: false, data: null, message: 'Unable to fetch!', pagination: null }
    }
};