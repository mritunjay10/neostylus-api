const userDb = require('./user.db');
const categoryDb = require('./category.db');
const courseDb = require('./course.db');
const subCategoryDb = require('./subCategory.db');
const slotDb = require('./slot.db');
const rawQuery = require('./rawQuries');

module.exports = {
  userDb,
  categoryDb,
  courseDb,
  subCategoryDb,
  slotDb,
  rawQuery,
};