const { JWT, JWK } = require('jose');

const { Redis: redis } = require('@redis');

const key = JWK.asKey({
  kty: process.env.JWT_KTY,
  k: process.env.JWT_KEY,
});

exports.createToken = ( user, audience )=>{

  const payload = { user };

  return JWT.sign(payload, key, {
    audience,
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_VALIDITY,
    header: {
      typ: process.env.JWT_TYPE,
    },
  });
};


exports.forgotOTP = ( user, aud, otp )=>{

  const payload = { user };

  return JWT.sign(payload, key, {
    audience: aud,
    issuer: process.env.JWT_ISSUER,
    otp,
    expiresIn: process.env.JWT_OTP_VALIDITY,
    header: {
      typ: process.env.JWT_TYPE,
    },
  });
};

exports.changePhone = ( { user, phone }, aud, otp )=>{

  const payload = { user, phone };

  return JWT.sign(payload, key, {
    audience: aud,
    issuer: process.env.JWT_ISSUER,
    otp,
    expiresIn: process.env.JWT_OTP_VALIDITY,
    header: {
      typ: process.env.JWT_TYPE,
    },
  });
};

exports.verify = async (authorization)=>{
  try{

    const value = await redis.get(authorization);

    if(value) throw { message: 'Logged out token' };

    JWT.verify(authorization, key, {
      issuer: process.env.JWT_ISSUER,
    });

    return { status: true, message: 'Successfully validated' }
  }
  catch (error){

    return { status: false, message: error.message || 'Error while validating!' }
  }
};

exports.decode = (authorization) =>{
  return JWT.decode(authorization)
};

exports.logout = async (authorization) =>{
  await redis.set(authorization, authorization);
  return true;
};