'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TestTimers', {
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionGroups',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      secondsElapsed: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('TestTimers', {
      fields: ['userId', 'groupId'],
      type: 'primary key',

      name: 'PK_TestTimers',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TestTimers');
  },
};
