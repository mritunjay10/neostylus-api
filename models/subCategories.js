/* jshint indent: 2 */

module.exports = (sequelize, DataTypes)=> {
    return  sequelize.define('subCategories', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            category: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(225),
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING(225),
                allowNull: false,
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
            tableName: 'subCategories',
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
