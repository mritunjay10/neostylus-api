const db = require('@models');

const Model = db.bookings;

Model.belongsTo(db.courses,  { sourceKey: 'id', foreignKey:'course', as:'bookingCourseDatum' });

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

exports.list = async(data)=>{

    try{

        data.where['deleted'] = false;
        data.where['status'] = true;

        const datum = await Model.findAndCountAll({
            where: data.where,
            offset: ((parseInt(+data.page)) - 1) * parseInt(+data.rowsPerPage),
            limit: parseInt(+data.rowsPerPage),
            order: [
                [data.sortBy, (data.descending === true ? 'DESC' : 'ASC')],
            ],
        });

        const pagination = {
            rowsPerPage: data.rowsPerPage,
            rowsNumber: datum.count ,
            page: data.page,
            sortBy: data.sortBy,
            descending: data.descending,
        };

        return { status: true, data: datum.rows, pagination , message: 'Bookings list' }
    }
    catch (e){

        return { status: false, data: null, message: e.message, pagination: null }
    }
};