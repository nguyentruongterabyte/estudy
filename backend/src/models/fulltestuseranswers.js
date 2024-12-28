'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FullTestUserAnswers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FullTestUserAnswers.init({
    fullTestId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FullTestUserAnswers',
  });
  return FullTestUserAnswers;
};