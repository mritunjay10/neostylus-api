const express = require('express');
const router = express.Router();

const { categoryController, categoryValidator } = require('@api/category/v1');
const { subCategoryController, subCategoryValidator } = require('@api/sub-category/v1');

router.get('/category/all', categoryController.all);

router.get('/sub-category/all', subCategoryController.all);

module.exports = router;
