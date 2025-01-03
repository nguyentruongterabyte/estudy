'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      groupId: DataTypes.INTEGER,
      question: DataTypes.TEXT,
      photoId: DataTypes.INTEGER,
      audioId: DataTypes.INTEGER,
      bundleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Question',
    },
  );
  return Question;
};
