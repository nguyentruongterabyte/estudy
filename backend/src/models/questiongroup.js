'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionGroup extends Model {
    static associate(models) {
    }
  }
  QuestionGroup.init( {
    grammarId: DataTypes.INTEGER,
    partId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuestionGroup',
  });
  return QuestionGroup;
};