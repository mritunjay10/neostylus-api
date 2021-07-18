/* jshint indent: 2 */

module.exports = (sequelize, DataTypes)=> {
  return  sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    profilePicture: {
      allowNull: true,
      type: DataTypes.STRING(500),
      defaultValue: 'https://mepod.s3.ap-south-1.amazonaws.com/mepod/default/user.png',
    },
    email: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    emailVerified:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    phoneVerified:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('User','Admin'),
      allowNull: false,
      defaultValue: 'User',
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: 'users',
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
