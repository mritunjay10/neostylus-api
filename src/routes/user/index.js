const express = require('express');
const router = express.Router();

const { bookingController, bookingValidator } = require('@api/booking/v1');

router.post('/create', bookingValidator.book, bookingController.book);

module.exports = router;
