const { response } = require('@utils');
const { userDb } = require('@models/shared');

exports.login = async (req, res, next)=>{

  try{

    const { phone, password } = req.body;

    if(!phone) throw { code: 409, message: 'Invalid phone!' };

    if(!password) throw { code: 409, message: 'Invalid password!' };

    next()

  }
  catch (e){

    response.error(res, e);
  }

};


exports.register = async (req, res, next)=>{

  try{

    const { name, phone, email, password } = req.body;

    if(!name) throw { code: 409, message: 'Invalid name!' };

    if(!phone) throw { code: 409, message: 'Invalid phone!' };

    if(!email) throw { code: 409, message: 'Invalid email!' };

    if(!password) throw { code: 409, message: 'Invalid password!' };

    const emailValid = await global.emailValidator.validate(email);

    if(!emailValid) throw { code: 412, message: 'Invalid email!' };

    const countryRegion = global.phoneNumber( phone ).getRegionCode();

    if(!countryRegion) throw { code: 412, message: 'Invalid country!'};

    const phoneValid = new global.phoneNumber( phone, countryRegion );

    if(!phoneValid.isValid()) throw { code: 412, message: 'Invalid phone number!' };

    const { status, data, message } = await userDb.get({
      [global.Op.or]:{
        phone, email,
      },
    });

    if(!status) throw { code: 503, message };

    if(data){

      if(data.email === email) throw { code: 412, message: 'Email already exists!' };

      if(data.phone === phone) throw { code: 412, message: 'Phone already exists!' };
    }

    next()
  }
  catch (e){

    response.error(res, e);
  }

};

exports.sendOTP = async (req, res, next)=>{

  try{

    const { auth, validate } = req.body;

    if(!auth) throw { code: 409, message: 'Invalid auth!' };

    if(!validate) throw { code: 409, message: 'Invalid validation params!' };

    if(!['phone','email'].includes(validate)) throw { code: 412, message: 'Invalid validation params!' }

    const countryRegion = global.phoneNumber( auth ).getRegionCode();

    if(!countryRegion) throw { code: 412, message: 'Invalid country!'};

    const phoneValid = new global.phoneNumber( auth, countryRegion );

    if(!phoneValid.isValid()) throw { code: 412, message: 'Invalid phone number!' };

    const { status, data, message } = await userDb.get({
      phone: auth,
    });

    if(!status) throw { code: 503, message };

    if(!data) throw { code: 409, message: 'No user is registered with this number!' };

    req.user = data;

    next()
  }
  catch (e){
    response.error(res, e);
  }
};

exports.verifyOTP = async (req, res, next)=>{

  try{

    const { otp } = req.body;

    if(!otp) throw { code: 409, message: 'Invalid OTP' };

    if(otp.length !== 6 ) throw { code: 409, message: 'Invalid OTP' };

    next()
  }
  catch (e){
    response.error(res, e);
  }
};


exports.phone = async (req, res, next)=>{

  try{

    const { phone } = req.body;

    if(!phone) throw { code: 409, message: 'Invalid phone!' };

    next()

  }
  catch (e){
    response.error(res, e);
  }

};

exports.forgotSetPassword = (req, res, next)=>{

  try{

    const { otp, password } = req.body;

    if(!otp) throw { code: 409, message: 'Invalid OTP!' };

    if(!password) throw { code: 409, message: 'Invalid password!' };

    if(password.length < 5 || password.length > 12) throw { code: 409, message: 'Invalid password!' };

    next()

  }
  catch (e){
    response.error(res, e);
  }

};