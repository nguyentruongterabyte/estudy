'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CorrectAnswers', {
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      answerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Answers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      explain: {
        type: Sequelize.TEXT,
        defaultValue: '',
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

    await queryInterface.addConstraint('CorrectAnswers', {
      fields: ['questionId', 'answerId'],
      type: 'primary key',
      name: 'PK_CorrectAnswers',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CorrectAnswers');
  },
};
