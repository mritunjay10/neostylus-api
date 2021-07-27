const express = require('express');
const router = express.Router();

const { bookingController, bookingValidator } = require('@api/booking/v1');

router.post('/bookings/create', bookingValidator.book, bookingController.book);

module.exports = router;
