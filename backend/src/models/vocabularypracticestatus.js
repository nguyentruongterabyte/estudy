'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VocabularyPracticeStatus extends Model {
    
    static associate(models) {
      VocabularyPracticeStatus.belongsTo( models.User, {
        foreignKey: 'userId',
        as: 'user'
      } )
      
      VocabularyPracticeStatus.belongsTo( models.Vocabulary, {
        foreignKey: 'vocabularyId',
        as: 'vocabulary'
      })
    }
  }
  
  VocabularyPracticeStatus.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vocabularyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VocabularyPracticeStatus',
  });
  return VocabularyPracticeStatus;
};