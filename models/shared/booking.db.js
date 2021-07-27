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

exports.bookedCourses = async (where) =>{

    try{

        const data = await Model.findAll({
            where,
            attributes: ['date','slot','course'],
        });

        return { status: true, data, message: 'Booking dates!', pagination: null }
    }
    catch (e){
        return { status: false, data: null, message: 'Unable to fetch!', pagination: null }
    }
};