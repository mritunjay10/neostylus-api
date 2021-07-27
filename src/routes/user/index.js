const express = require('express');
const router = express.Router();

const { orderController, orderValidator } = require('@api/order/v1');

router.post('/book', orderValidator.book, orderController.book);

module.exports = router;