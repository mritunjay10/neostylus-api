const { response } = require('@utils');
const { categoryDb } = require('@models/shared');


exports.all = async (req, res)=>{

    try{

        const { status, data, message } = await categoryDb.all();

        response.success(res, { code: 200, status, message, data , pagination: null });
    }
    catch (e){
        response.error(res, e)
    }
};