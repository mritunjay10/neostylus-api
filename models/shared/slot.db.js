const db = require('@models');

const Model = db.slots;

Model.belongsTo(db.courses,  { sourceKey: 'id', foreignKey:'course', as:'courseSlotDatum' });

exports.create = async (datum)=>{
    try{

        const data  = await Model.create(datum);

        return { status: true, data, message: 'Created course!' };
    }
    catch (e){
        return { status: false, message: e.message || 'Unable to create course', pagination: null }
    }
};

exports.list = async (data) =>{

    try{

        data.where['deleted'] = false;
        data.where['status'] = true;

        const datum = await Model.findAndCountAll({
            where: data.where,
            offset: ((parseInt(+data.page)) - 1) * parseInt(+data.rowsPerPage),
            limit: parseInt(+data.rowsPerPage),
            include: [
                {
                    model : db.courses,
                    as: 'courseSlotDatum',
                    attributes: ['id','title','imageUrl','coverImageUrl']
                },
            ],
            order: [
                [data.sortBy, (data.descending === true ? 'DESC' : 'ASC')],
            ],
        });

        const pagination = {
            rowsPerPage: data.rowsPerPage,
            total: datum.count ,
            page: data.page,
            sortBy: data.sortBy,
            descending: data.descending,
        };

        return { success: true, data: datum.rows, pagination , message: 'Courses list' }
    }
    catch (e){

        return { success: false, data: null, message: e.message || 'Unable to fetch courses', pagination: null }
    }
};