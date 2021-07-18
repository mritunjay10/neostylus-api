const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');
const path = require('path');
const { v4:  uuid } = require('uuid');


const s3 = global.s3;

exports.media = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_POST_MEDIA_SOURCE,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {

      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      const type = file.mimetype;

      if(file.mimetype === 'image/jpeg'
          || file.mimetype === 'image/png'
          || file.mimetype === 'image/jpg'  ){

        req.thumbnailFile = fileName;
        req.thumbnail = `${process.env.S3_THUMBNAIL_URL}${fileName}`;
      }
      else{

        if(req.media && req.media.length>0){
          req.media.push({
            url: `${process.env.S3_SOURCE_URL}${fileName}`,
            type,
          })
        }
        else{
          const media = [];
          media.push({
            url: `${process.env.S3_SOURCE_URL}${fileName}`,
            type,
          });
          req.media = media;
        }
      }

      cb(null, fileName);
    },
  }),
});


exports.profilePicture = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_USER_IMAGES,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      req.profilePicture = `${process.env.S3_USER_URL}${fileName}`;
      cb(null, fileName);
    },
  }),
});

exports.photoId = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_OTHER_IMAGES,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      req.photoId = `${process.env.S3_USER_URL}${fileName}`;
      cb(null, fileName);
    },
  }),
});

exports.image = multer({

  storage: multerS3({
    s3,
    bucket: process.env.S3_OTHER_IMAGES,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = uuid()+ext;
      req.image = `${process.env.S3_OTHER_URL}${fileName}`;
      cb(null, fileName);
    },
  }),
});