'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionAudio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionAudio.init({
    questionId: DataTypes.INTEGER,
    audioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionAudio',
  });
  return QuestionAudio;
};