const express = require('express');
const router = express.Router();

const { categoryController, categoryValidator } = require('@api/category/v1');
const { subCategoryController, subCategoryValidator } = require('@api/sub-category/v1');
const { courseController, courseValidator } = require('@api/course/v1');
const { slotController, slotValidator } = require('@api/slot/v1');

router.get('/category/all', categoryController.all);

router.get('/sub-category/all/:category', subCategoryController.all);

router.post('/course/list', courseValidator.list, courseController.list);

router.post('/slot/list', slotValidator.list, slotController.list);

module.exports = router;
