'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('slots', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        category:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        subCategory:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        course:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        startTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        endTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        status:{
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        deleted:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },

    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('slots');
  }
};
