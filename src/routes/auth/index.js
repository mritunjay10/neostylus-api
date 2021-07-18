const express = require('express');
const router = express.Router();

const { authorization } = require('@middleware');

const { authValidator, authController } = require('@api/auth/v1');

router.post('/login', authValidator.login, authController.login);

router.post('/register', authValidator.register, authController.register);

router.post('/google-register', authValidator.googleRegister, authController.googleRegister);

router.post('/google-login', authValidator.googleLogin, authController.googleLogin);

router.post('/send-otp', authValidator.sendOTP, authController.sendOTP);

router.post('/verify-otp', authorization.checkVerifyJWT, authValidator.verifyOTP, authController.verifyOTP);

router.post('/forgot-password', authValidator.phone, authController.forgotPasswordOTP);

router.patch('/forgot-password', authorization.checkOTP, authValidator.forgotSetPassword, authController.forgotSetPassword);

router.delete('/logout', authorization.checkUser, authController.logOut);

module.exports = router;
