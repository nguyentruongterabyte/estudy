'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CorrectAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CorrectAnswer.init(
    {
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      answerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      explain: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'CorrectAnswer',
    },
  );
  return CorrectAnswer;
};
