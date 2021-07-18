const response = require('./response');
const JWT = require('./jwt');
const S3 = require('./s3Bucket.class');
const OneSignal = require('./oneSignal.class');

module.exports = {
  response,
  JWT,
  S3: new S3(),
  oneSignal: new OneSignal(),
};