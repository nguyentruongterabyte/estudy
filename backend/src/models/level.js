'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Level.init({
    code: DataTypes.STRING(10),
    name: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};