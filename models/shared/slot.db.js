const db = require('@models');

const Model = db.slots;

Model.belongsTo(db.courses,  { sourceKey: 'id', foreignKey:'course', as:'courseSlotDatum' });

exports.create = async (datum)=>{
    try{

        const data  = await Model.create(datum);

        return { status: true, data, message: 'Created slot!' };
    }
    catch (e){
        return { status: false, message: e.message || 'Unable to create slot', pagination: null }
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

        return { status: true, data: datum.rows, pagination , message: 'Slot list' }
    }
    catch (e){

        return { status: false, data: null, message: e.message || 'Unable to fetch slots', pagination: null }
    }
};


exports.count = async (where) => {

    try{

        where['deleted'] = false;
        where['status'] = true;

        const data = await Model.count({ where });

        return { status: true, data, pagination: null , message: 'Slot count!' }
    }
    catch (e){
        return { status: false, data: null, message: e.message || 'Unable to fetch slots', pagination: null }
    }
};

exports.get = async (where) => {

    try{

        where['deleted'] = false;
        where['status'] = true;

        const data = await Model.findOne({ where });

        return { status: true, data, pagination: null , message: 'Slots!' }
    }
    catch (e){
        return { status: false, data: null, message: e.message || 'Unable to fetch slots', pagination: null }
    }
};

exports.fetch = async (where) => {

    try{

        where['deleted'] = false;
        where['status'] = true;

        const data = await Model.findAll({ where });

        return { status: true, data, pagination: null , message: 'Slots!' }
    }
    catch (e){
        return { status: false, data: null, message: e.message || 'Unable to fetch slots', pagination: null }
    }
};

exports.update = async (data) =>{

    try{

        let body ={};

        for(let key in data.body) {

            if(data.body.hasOwnProperty(key)){

                if(data.body[key]){
                    body[key] = data.body[key];
                }
            }
        }

        const datum = await Model.update(body, { where: { id: data.id } });

        return { status: true, data: datum[0], pagination: null , message: 'Updated successfully' }
    }
    catch (e){
        return { status: false, data: null, message: e.message || 'Unable to update', pagination: false }
    }
};

exports.delete = async (where) =>{

    try{
        const datum = await Model.update({ deleted: true }, { where });

        return { status: true, data: datum[0], pagination: null , message: 'Deleted successfully' }
    }
    catch (e){
        return { status: false, data: null, message: e.message || 'Unable to delete', pagination: false }
    }
};
