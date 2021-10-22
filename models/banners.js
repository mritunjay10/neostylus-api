/* jshint indent: 2 */

module.exports = (sequelize, DataTypes)=> {
  return  sequelize.define('slots', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
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
    tableName: 'slots',
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
