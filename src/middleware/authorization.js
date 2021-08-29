const { JWT, response } = require('@utils');

exports.checkUser = async (req, res, next)=>{
  'use strict';
  try{

    const { authorization } = req.headers;

    if(!authorization) throw  { code: 401, message: 'Invalid request token' };

    const { status, message } = await JWT.verify(authorization);

    if(!status) throw { code: 401, message  };

    const decoded = JWT.decode(authorization);

    if(!(decoded.aud.includes('User'))) throw { code: 401, message: 'Unauthorized access!' };

    req.userId = decoded.user.id;
    req.role = decoded.user.role;
    req.isAdmin = decoded.user.role === 'Admin';
    req.authorization = authorization;

    next()
  }
  catch (e) {
    response.error(res, e)
  }
};

exports.checkVerifyJWT = async (req, res, next)=>{
  'use strict';
  try{

    const { authorization } = req.headers;

    if(!authorization) throw  { code: 401, message: 'Invalid request token' };

    const { status, message } = await JWT.verify(authorization);

    if(!status) throw { code: 401, message  };

    const decoded = JWT.decode(authorization);

    req.authorization = authorization;
    req.userId = decoded.user.id;

    next()
  }
  catch (e) {
    response.error(res, e)
  }
};

exports.checkOTP = async (req, res, next)=>{
  'use strict';
  try{

    const { authorization } = req.headers;

    if(!authorization) throw  { code: 401, message: 'Invalid request token' };

    const { status, message } = await JWT.verify(authorization);

    if(!status) throw { code: 401, message  };

    const decoded = JWT.decode(authorization);

    // if(!(decoded.aud.includes('admin'))) throw { code: 401, message: 'Invalid admin!' };

    req.authorization = authorization;
    req.userId = decoded.user.id;
    req.isAdmin = decoded.aud.includes('admin');

    next()
  }
  catch (e) {
    response.error(res, e)
  }
};

exports.changePhoneOTP = async (req, res, next)=>{
  try{

    const { token } = req.body;

    if(!token) throw  { code: 401, message: 'Invalid request token' };

    const { status, message } = await JWT.verify(token);

    if(!status) throw { code: 401, message  };

    const decoded = JWT.decode(token);

    console.log(decoded.user);

    if(req.userId !== decoded.user) throw { message: 'Invalid token!' };

    // req.userId = decoded.user.id;
    req.isAdmin = decoded.aud.includes('admin');

    next()
  }
  catch (e) {
    response.error(res, e)
  }
};

exports.checkCommon = async (req, res, next)=>{
  'use strict';
  try{
    next()
  }
  catch (e) {
    response.error(res, e)
  }
};