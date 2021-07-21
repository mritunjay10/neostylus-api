const express = require('express');
const router = express.Router();

const { categoryController, categoryValidator } = require('@api/category/v1');

router.get('/category/all', categoryController.all);

module.exports = router;
