'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: models.RoleDetail,
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING(50),
      lastName: DataTypes.STRING(30),
      email: DataTypes.STRING,
      password: DataTypes.STRING(64),
      // refreshToken: DataTypes.STRING(256),
      phoneNumber: DataTypes.STRING(12),
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
