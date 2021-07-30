const express = require('express');
const router = express.Router();

const { categoryValidator, categoryController, } = require('@api/category/v1');

router.post('/category/list', categoryValidator.list, categoryController.list);

module.exports = router;