'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocabulary extends Model {
    static associate(models) {}
  }
  Vocabulary.init(
    {
      word: DataTypes.STRING(50),
      pronounciation: DataTypes.STRING(100),
      definition: DataTypes.TEXT,
      example: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Vocabulary',
    },
  );
  return Vocabulary;
};
