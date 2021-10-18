const Razorpay = require('razorpay');


exports.validate = async (req, res, next)=>{

  try{

    const signature = req.headers['x-razorpay-signature'];

    const validate = Razorpay.validateWebhookSignature(JSON.stringify(req.body), signature, process.env.RAZOR_WEBHOOK_KEY);

    if(!validate) throw { code: 400, message: 'Invalid razorpay credentials' };

    next()
  }
  catch (e){

    res.sendStatus(e.code || 503)
  }
};