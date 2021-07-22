'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('courses', {
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
        title: {
            type: Sequelize.STRING(225),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(1000),
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING(225),
            allowNull: false,
        },
        coverImage: {
            type: Sequelize.STRING(225),
            allowNull: false,
        },
        totalSessions: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        sessionDuration:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        costPerSession: {
            type: Sequelize.FLOAT(12,6),
            allowNull: false,
        },
        mandatorySessionCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        meta: {
            type: Sequelize.JSON,
            allowNull: true,
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
    await queryInterface.dropTable('courses');
  }
};
