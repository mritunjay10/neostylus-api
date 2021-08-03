const db = require('@models');

const Model = db.courses;

const rawQueries = require('./rawQuries');

Model.belongsTo(db.categories,  { sourceKey: 'id', foreignKey:'category', as:'courseCategoryDatum' });
Model.belongsTo(db.subCategories,  { sourceKey: 'id', foreignKey:'subCategory', as:'courseSubCategoryDatum' });

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
                    model : db.categories,
                    as: 'courseCategoryDatum',
                    attributes: ['id','title']
                },
                {
                    model : db.subCategories,
                    as: 'courseSubCategoryDatum',
                    attributes: ['id','title', 'imageUrl']
                },
            ],
            attributes: {
              include: [
                  [db.Sequelize.literal(
                      rawQueries.slotCount("`courses`.`id`")
                  ),
                      'slotCount']
              ]
            },
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

        return { status: true, data: datum.rows, pagination , message: 'Courses list' }
    }
    catch (e){

        return { status: false, data: null, message: e.message || 'Unable to fetch courses', pagination: null }
    }
};