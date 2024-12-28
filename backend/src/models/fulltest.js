'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FullTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FullTest.init(
    {
      userId: DataTypes.INTEGER,
      secondsElapsed: DataTypes.INTEGER,
      photoDescriptionId: DataTypes.INTEGER,
      questionResponseId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
      shortTalkId: DataTypes.INTEGER,
      incompleteSentenceId: DataTypes.INTEGER,
      singlePassageId: DataTypes.INTEGER,
      doublePassageId: DataTypes.INTEGER,
      triplePassageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FullTest',
    },
  );
  return FullTest;
};
