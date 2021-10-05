const multer = require('multer');
const multerS3 = require('multer-s3-v2');
const path = require('path');
const { v4:  uuid } = require('uuid');

const s3 = global.s3;

exports.image = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {
      console.log(file)
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      console.log(`${process.env.S3_BASE_URL}${fileName}`)
      req.image = `${process.env.S3_BASE_URL}${fileName}`;
      cb(null, fileName);
    },
  }),
});