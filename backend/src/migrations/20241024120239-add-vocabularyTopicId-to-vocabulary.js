'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 'Vocabularies', 'vocabularyTopicId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'VocabularyTopics',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn( 'Vocabularies', 'vocabularyTopicId' );
  }
};
