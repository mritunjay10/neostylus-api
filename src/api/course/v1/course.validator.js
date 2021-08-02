const { response } = require('@utils');


exports.create = (req, res, next)=>{

    try{

        const { category, subCategory, title,
            description, totalSession, sessionDuration,
            meta, costPerSession, mandatorySessionCount } = req.body;

        if(!category) throw { code: 409,  message: 'Invalid category!' };

        if(!subCategory) throw { code: 409,  message: 'Invalid sub-category!' };

        if(!title) throw { code: 409,  message: 'Invalid title!' };

        if(!description) throw { code: 409,  message: 'Invalid description!' };

        if(!meta) throw { code: 409,  message: 'Invalid meta!' };

        if(!totalSession) throw { code: 409,  message: 'Invalid total session!' };

        if(!sessionDuration) throw { code: 409,  message: 'Invalid session duration!' };

        if(!costPerSession) throw { code: 409,  message: 'Invalid cost per session!' };

        if(!mandatorySessionCount) throw { code: 409,  message: 'Invalid mandatory session!' };

        next()
    }
    catch (e) {
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
