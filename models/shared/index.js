const userDb = require('./user.db');
const categoryDb = require('./category.db');
const courseDb = require('./course.db');
const subCategoryDb = require('./subCategory.db');
const slotDb = require('./slot.db');
const bookingDb = require('./booking.db');
const rawQuery = require('./rawQuries');
const bannerDb = require('./banner.db');

module.exports = {
  userDb,
  categoryDb,
  courseDb,
  subCategoryDb,
  slotDb,
  bookingDb,
  rawQuery,
  bannerDb,
};