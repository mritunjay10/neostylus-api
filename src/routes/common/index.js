const express = require('express');
const router = express.Router();

const { bannerValidator, bannerController } = require('@api/banner/v1');
const { categoryController } = require('@api/category/v1');
const { subCategoryController } = require('@api/sub-category/v1');
const { courseController, courseValidator } = require('@api/course/v1');
const { slotController, slotValidator } = require('@api/slot/v1');
const { bookingValidator, bookingController } = require('@api/booking/v1');

router.post('/banner/list', bannerValidator.list, bannerController.list);

router.get('/category/all', categoryController.all);

router.get('/sub-category/all/:category?', subCategoryController.all);

router.post('/course/list', courseValidator.list, courseController.list);

router.post('/slot/list', slotValidator.list, slotController.list);

router.post('/booking/list', bookingValidator.list, bookingController.list);

module.exports = router;
