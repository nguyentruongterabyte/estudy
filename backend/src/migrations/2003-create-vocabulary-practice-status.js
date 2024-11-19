'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VocabularyPracticeStatuses', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vocabularyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vocabularies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('VocabularyPracticeStatuses', {
      fields: ['userId', 'vocabularyId'],
      type: 'primary key',
      name: 'PK_VocabularyPracticeStatuses',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VocabularyPracticeStatuses');
  },
};
