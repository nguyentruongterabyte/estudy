'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VocabularyTopic extends Model {
    static associate(models) {}
  }
  VocabularyTopic.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'VocabularyTopic',
    },
  );
  return VocabularyTopic;
};
