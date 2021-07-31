const { response } = require('@utils');
const { subCategoryDb } = require('@models/shared');


exports.all = async (req, res)=>{

    try{

        const { category } = req.params;

        const where = {};

        if(category){
            where['category'] = category;
        }

        const { status, data, message } = await subCategoryDb.all(where);

        if(!status) throw { message };

        response.success(res, { code: 200, status, message, data , pagination: null });
    }
    catch (e){
        response.error(res, e)
    }
};

exports.create = async (req, res) =>{

    try{

        const { title, category } = req.body;

        const { status, data, message } = await subCategoryDb.create({
            title, category
        });

        if(!status) throw { message };

        response.success(res, { code: 200, status, message, data , pagination: null });
    }
    catch (e){
        response.error(res, e)
    }
};


exports.list = async (req, res,) =>{

    try{

        const { filterBy, search } = req.body;
        const { category } = req.params;

        let where = {};

        if(search){

            if(!['title',]
                    .includes(filterBy)) throw { code: 409, message: 'Invalid filter by' };

            where[filterBy] = {
                [global.Op.like]: '%'+search+'%',
            };
        }

        if(category){
            where['category'] = category;
        }

        where['status'] = true;
        where['deleted'] = false;

        const { status, data, message, pagination } = await subCategoryDb.list({
            page: req.body.pagination.page,
            rowsPerPage: req.body.pagination.rowsPerPage,
            sortBy: req.body.pagination.sortBy,
            descending: req.body.pagination.descending,
            where: where,
        });

        if(!status) throw { message };

        response.success(res, { code: 200, message, data, pagination});

    }
    catch (e) {

        response.error(res, e);
    }
};
