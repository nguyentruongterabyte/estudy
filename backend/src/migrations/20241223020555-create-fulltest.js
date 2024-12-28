'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FullTests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      secondsElapsed: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      photoDescriptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      questionResponseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      conversationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      shortTalkId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      incompleteSentenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      textCompletionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      singlePassageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      doublePassageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
      },
      triplePassageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FullTests');
  },
};
