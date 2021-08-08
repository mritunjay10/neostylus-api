const { response } = require('@utils');

exports.create = (req, res, next) => {

    try{

        const { title } = req.body;

        if(!title) throw { code: 409, message: 'Invalid title!' };

        next()
    }
    catch (e){
        response.error(res, e);
    }
};

exports.list = (req, res, next) =>{

    try{

        const { pagination } = req.body;

        const {page, rowsPerPage, sortBy, descending } = pagination;

        if(!pagination) throw { code: 409, message: 'Invalid pagination' };

        if(page<0) throw { code: 409, message: 'Invalid list request' };

        if(rowsPerPage<1) throw { code: 409, message: 'Invalid list count' };

        if(!sortBy) throw { code: 409, message: 'Invalid sort by' };

        if(![true, false].includes(descending)) throw { code: 409, message: 'Invalid list order' };

        next()

    }
    catch (e) {
        response.error(res, e);
    }
};

exports.update = (req, res, next) => {

    try{

        const { id } = req.params;

        const { title } = req.body;

        if(!id) throw { code: 409, message: 'Invalid id!' }

        if(!title) throw { code: 409, message: 'Invalid title!' }

        next()
    }
    catch (e){
        response.error(res, e);
    }
}
