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
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      req.image = `${process.env.S3_BASE_URL}${fileName}`;
      cb(null, fileName);
    },
  }),
});

exports.courseImage = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      if(req.image){
        req.coverImage = `${process.env.S3_BASE_URL}${fileName}`;
      }
      else{
        req.image = `${process.env.S3_BASE_URL}${fileName}`;
      }
      cb(null, fileName);
    },
  }),
});

exports.banners = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      if(req.banners && req.banners.length>0){
        req.banners.push(`${process.env.S3_BASE_URL}${fileName}`)
      }
      else{
        const banners = []
        banners.push(`${process.env.S3_BASE_URL}${fileName}`)
        req.banners = banners
      }
      cb(null, fileName);
    },
  }),
})