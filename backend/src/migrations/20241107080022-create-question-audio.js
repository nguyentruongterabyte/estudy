'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuestionAudios', {
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      audioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Audios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    } );
    await queryInterface.addConstraint('QuestionAudios', {
      fields: ['questionId', 'audioId'],
      type: 'primary key',
      name: 'PK_QuestionAudios',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QuestionAudios');
  },
};
