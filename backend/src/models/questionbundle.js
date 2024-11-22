'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExplanationText extends Model {
    static associate(models) {}
  }
  ExplanationText.init(
    {
      audioId: DataTypes.INTEGER,
      photoId: DataTypes.INTEGER,
      questionGroupId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'QuestionBundle',
    },
  );
  return ExplanationText;
};
