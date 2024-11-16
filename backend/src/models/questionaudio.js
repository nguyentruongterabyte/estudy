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
    questionId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true
    },
    audioId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'QuestionAudio',
  });
  return QuestionAudio;
};