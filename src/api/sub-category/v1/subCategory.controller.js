const { response } = require('@utils');
const { subCategoryDb } = require('@models/shared');


exports.all = async (req, res)=>{

    try{

        const { status, data, message } = await subCategoryDb.all();

        response.success(res, { code: 200, status, message, data , pagination: null });
    }
    catch (e){
        response.error(res, e)
    }
};