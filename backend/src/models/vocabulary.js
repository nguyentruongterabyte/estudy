'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocabulary extends Model {
    static associate(models) {}
  }
  Vocabulary.init(
    {
      word: DataTypes.STRING(50),
      pronunciation: DataTypes.STRING(100),
      definition: DataTypes.TEXT,
      example: DataTypes.TEXT,
      photoId: DataTypes.INTEGER,
      topicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Vocabulary',
    },
  );
  return Vocabulary;
};
