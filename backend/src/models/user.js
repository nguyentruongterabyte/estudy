'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    firstName: DataTypes.STRING( 50 ),
    lastName: DataTypes.STRING(30),
    email: DataTypes.STRING,
    password: DataTypes.STRING(64),
    phoneNumber: DataTypes.STRING( 12 ),
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};