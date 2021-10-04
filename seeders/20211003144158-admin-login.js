'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const encPassword = await bcrypt.hash('qwerty', 10);

    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@gmail.com',
      phone: '+911111111111',
      password: encPassword,
      emailVerified: true,
      phoneVerified: true,
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        name: 'MJK',
        email: 'mjk@gmail.com',
        phone: '+912222222222',
        password: encPassword,
        emailVerified: true,
        phoneVerified: true,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
