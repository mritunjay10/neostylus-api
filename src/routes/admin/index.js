const express = require('express');
const router = express.Router();

const { categoryValidator, categoryController } = require('@api/category/v1');
const { subCategoryValidator, subCategoryController } = require('@api/sub-category/v1');
const { courseValidator, courseController } = require('@api/course/v1');
const { slotValidator, slotController } = require('@api/slot/v1');
const { s3upload } = require('@middleware')

router.post('/category/create', s3upload.image.fields([
  { name: 'file', maxCount: 1 },
]), categoryValidator.create, categoryController.create);

router.post('/category/list', categoryValidator.list, categoryController.list);

router.put('/category/:id', categoryValidator.update, categoryController.update);

router.post('/sub-category/create', s3upload.image.fields([
  { name: 'file', maxCount: 1 },
]), subCategoryValidator.create, subCategoryController.create);

router.post('/sub-category/list/:category?', subCategoryValidator.list, subCategoryController.list);

router.put('/sub-category/:id', subCategoryValidator.update, subCategoryController.update);


router.post('/course/create',  s3upload.courseImage.fields([
  { name: 'file', maxCount: 1 },
  { name: 'coverFile', maxCount: 1 },
]), courseValidator.create, courseController.create);

router.post('/course/list', courseValidator.list, courseController.list);

router.put('/course/:id', courseValidator.update, courseValidator.create, courseController.update);


router.post('/slot/all', slotController.all);

router.post('/slot/create', slotValidator.create, slotController.create);

router.post('/slot/list', slotValidator.list, slotController.list);

router.delete('/slot/delete/:id', slotValidator.id, slotController.delete);


module.exports = router;