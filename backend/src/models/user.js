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
      phoneNumber: DataTypes.STRING(12),
      photoId: DataTypes.INTEGER,
      OTP: DataTypes.STRING(7),
      OTPAttempts: DataTypes.INTEGER,
      OTPExpiresAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
