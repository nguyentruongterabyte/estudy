'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocabulary extends Model {
    static associate(models) {
      
    }
  }
  Vocabulary.init({
    word: DataTypes.STRING(50),
    pronounciation: DataTypes.STRING,
    definition: DataTypes.STRING,
    example: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vocabulary',
  });
  return Vocabulary;
};