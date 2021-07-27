const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const { v4:  uuid } = require('uuid');

const { Redis: redis } = require('@redis');
const { userDb, } = require('@models/shared');
const { response, JWT } = require('@utils');

exports.login = async (req, res) =>{

  try{

    const audience = [];

    const { phone, password } = req.body;

    const { status, data, message, pagination } = await userDb.login({ phone, password });
      
    if(!status) throw { code: 503, message };

    audience.push(data.role);

    const token = JWT.createToken({ id: data.id, type: data.type, status: data.status}, audience);

    data.setDataValue('password', null);
    data.setDataValue('role', null);
    data.setDataValue('token', token);

    response.success(res, { code: 200, status: true, message: message, data, pagination });
  }
  catch(e) {
    response.error(res, e)
  }
};

exports.register = async (req, res) =>{

  try{

    const { name, email, password, phone } = req.body;

    const encPassword = await bcrypt.hash(password, global.saltRounds);

    const { status, message, data, pagination } = await userDb.create({
      name,
      password: encPassword,
      email,
      phone,
    });

    if(!status) throw { code: 409, message, data };

    data.setDataValue('password', null);

    response.success(res, { code: 201, status, message, data, pagination});

  }
  catch (e){
    response.error(res, e);
  }
};


exports.sendOTP = async (req, res)=>{
  try{

    //const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    const otp = 111111;

    const user = req.user;

    const audience = [];
    audience.push(user.role.toString());

    const optJWT = JWT.forgotOTP({ id:  user.id, role: user.role, validate: 'phone'}, audience);

    const hash = crypto.createHash('md5').update(optJWT).digest('hex');

    // console.log({phone, otp, senderId: process.env.SMS_SENDER_ID})

    // otpUtil.sendForgotOTP({phone, otp});

    redis.set(hash, otp);

    response.success(res, { code: 200, success: true, message: 'OTP Token', data: optJWT , pagination: null });

  }
  catch (e){
    response.error(res, e);
  }
};

exports.verifyOTP = async (req, res) =>{

  try{

    const { otp, validate } = req.body;

    if(!otp) throw { code: 409, message: 'Invalid OTP' };

    const hash = crypto.createHash('md5').update(req.authorization).digest('hex');

    const redisOTP = await redis.get(hash);

    if(!redisOTP) throw { code: 409, message: 'Invalid OTP token' };

    if(!(redisOTP === otp)) throw { code: 409, message: 'Invalid OTP' };

    const decoded = JWT.decode(req.authorization);

    const body = {};

    const jwtValidate = decoded.user.validate;

    if(jwtValidate === validate){
      body['phoneVerified'] = true;
    }
    else if(jwtValidate === validate){
      body['emailVerified'] = true;
    }
    else{
      throw { code: 409, message: 'Invalid validator!' }
    }

    body['status'] = true;

    const { status, data, message } = await userDb.update({
      body,
      where: { id: decoded.user.id },
    });

    if(!status) throw { code: 503, message };

    response.success(res, { code: 200, message: 'Account verified successfully!', data , pagination: null });

  }
  catch(e) {
    response.error(res, e)
  }

};

exports.forgotPasswordOTP = async(req, res)=>{

  try{

    const { phone } = req.body;

    const audience = [];

    const { status, data, message } = await userDb.get({ phone });

    if(!status) throw { code: 503, message };

    if(!data) throw { code: 409, message: 'Invalid user!' };

    //  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    const otp = 111111;

    audience.push(data.role.toString());

    const optJWT = JWT.forgotOTP({ id: data.id, role:data.role}, audience);

    const hash = crypto.createHash('md5').update(optJWT).digest('hex');

    // console.log({phone, otp, senderId: process.env.SMS_SENDER_ID})

    // otpUtil.sendForgotOTP({phone, otp});

    redis.set(hash, otp);

    response.success(res, { code: 200, message: 'OTP Token', data: optJWT , pagination: null });

  }
  catch(e) {
    response.error(res, e)
  }
};

exports.forgotSetPassword = async(req, res)=>{

  try{

    const { password, otp } = req.body;

    if(!otp) throw { code: 409, message: 'Invalid OTP' };

    const encPassword = await bcrypt.hash(password, global.saltRounds);

    const hash = crypto.createHash('md5').update(req.authorization).digest('hex');

    const redisOTP = await redis.get(hash);

    if(!redisOTP) throw { code: 409, message: 'Invalid OTP token' };

    if(!(redisOTP === otp)) throw { code: 409, message: 'Invalid OTP' };

    const decoded = JWT.decode(req.authorization);

    const { status, data, message } = await userDb.update({
      body: { password: encPassword },
      id: decoded.user.id,
    });

    if(!status) throw { code: 503, message };

    response.success(res, { code: 200, message: 'Password changed successfully!', data , pagination: null });

  }
  catch(e) {
    response.error(res, e)
  }
};

exports.googleRegister = async (req, res,) =>{

  try{

    const { name, email, phone } = req.body;

    const encPassword = await bcrypt.hash(uuid(), global.saltRounds);

    const random = otpGenerator.generate(8, { digits: false, alphabets: true, upperCase: true, lowerCase: false, specialChars: false });

    const { status, message, data, pagination } = await userDb.create({
      name,
      username: `${name.replace(' ', '')}-${random.toLowerCase()}`,
      password: encPassword,
      email,
      phone,
      emailVerified: true,
    });

    if(!status) throw { code: 409, message, data };

    data.setDataValue('password', null);

    response.success(res, { code: 201, message, data, pagination});

  }
  catch(e) {
    response.error(res, e)
  }
};

exports.googleLogin = async (req, res,) =>{

  try{

    const audience = [];

    const { email } = req.body;

    const { status, data, message, pagination } = await userDb.get({ email, emailVerified: true });

    if(!status) throw { code: 503, message };

    if(!data) throw { code: 401, message: 'Google login failed!' };

    audience.push(data.role);

    const token = JWT.createToken({ id: data.id, type: data.type, status: data.status}, audience);

    data.setDataValue('password', null);
    data.setDataValue('role', null);
    data.setDataValue('token', token);

    response.success(res, { code: 200, message: message, data, pagination });
  }
  catch(e) {
    response.error(res, e)
  }
};

exports.logOut = async (req, res)=>{

  try{

    await userDb.update({ body:{ oneSignalToken: null, where:{ id: req.userId } }});

    await JWT.logout(req.authorization);

    response.success(res, { code: 200, message: 'Logged out successfully!', data: 1, pagination: null });
  }
  catch (e){
    response.error(res, e);
  }
};
