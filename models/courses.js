/* jshint indent: 2 */

module.exports = (sequelize, DataTypes)=> {
    return  sequelize.define('courses', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            category:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            subCategory:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(225),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING(225),
                allowNull: true,
            },
            coverImageUrl: {
                type: DataTypes.STRING(225),
                allowNull: true,
            },
            totalSessions: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            sessionDuration:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            costPerSessionFaceToFaceINR: {
                type: DataTypes.FLOAT(12,6),
                allowNull: false,
            },
            costPerSessionFaceToFaceINT: {
                type: DataTypes.FLOAT(12,6),
                allowNull: false,
            },
            costPerSessionOnlineINR: {
                type: DataTypes.FLOAT(12,6),
                allowNull: false,
            },
            costPerSessionOnlineINT: {
                type: DataTypes.FLOAT(12,6),
                allowNull: false,
            },
            meta: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            status:{
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            deleted:{
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'courses',
            hooks: {
                beforeCreate: function (datum, options,) {
                    datum.createdAt = new Date();
                    datum.updatedAt = new Date();
                },
                beforeUpdate: function (datum, options,) {
                    datum.updatedAt = new Date();
                },
            },
        },
    );

};
