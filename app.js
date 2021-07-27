const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const env = dotenv.config();
dotenvExpand(env);

require('module-alias/register');

const express = require('express');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');
const Sequelize = require('sequelize');
const AWS = require('aws-sdk');

const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const emailValidator = require('email-validator');
const phoneNumber = require( 'awesome-phonenumber' );

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

global.s3 = new AWS.S3();

global.saltRounds = global.saltRounds || 10;

global.Op = global.Op || Sequelize.Op;
global.basePath = global.basePath || __dirname;
global.emailValidator = global.emailValidator || emailValidator;
global.phoneNumber = global.phoneNumber || phoneNumber;

const { authorization, } = require('@middleware');

const auth = require('@routes/auth');
const common = require('@routes/common');
const user = require('@routes/user');

const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());

////////////////////////////////    ADMIN
app.use('/api/v1/auth', auth);
app.use('/api/v1/common', common);
app.use('/api/v1/user', authorization, user);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
    res.status(404).json({ success: false, message: 'NO PAGE FOUND', data: null, pagination: null  })
});

// error handler
app.use((err, req, res, next)=> {
    // set locals, only providing error in development
    res.locals.message = process.env.NODE_ENV === 'development' ? err.message: 'Some error occurred';
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    res.status(500).json({ success: false, message: res.locals.error, data: null, pagination: null  })
});

module.exports = app;
