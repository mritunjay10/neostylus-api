'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            profilePicture: {
                allowNull: true,
                type: Sequelize.STRING(500),
                defaultValue: 'https://mepod.s3.ap-south-1.amazonaws.com/mepod/default/user.png',
            },
            email: {
                type: Sequelize.STRING(225),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(225),
                allowNull: false,
            },
            emailVerified:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            phoneVerified:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            role: {
                type: Sequelize.ENUM('User','Admin'),
                allowNull: false,
                defaultValue: 'User',
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
        await await queryInterface.dropTable('users');
    },
};