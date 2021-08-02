const express = require('express');
const router = express.Router();

const { categoryValidator, categoryController, } = require('@api/category/v1');
const { subCategoryValidator, subCategoryController, } = require('@api/sub-category/v1');
const { courseValidator, courseController, } = require('@api/course/v1');

router.post('/category/create', categoryValidator.create, categoryController.create);

router.post('/category/list', categoryValidator.list, categoryController.list);


router.post('/sub-category/create', subCategoryValidator.create, subCategoryController.create);

router.post('/sub-category/list/:category?', subCategoryValidator.list, subCategoryController.list);


router.post('/course/create', courseValidator.create, courseController.create);

router.post('/course/list', courseValidator.list, courseController.list);

module.exports = router;