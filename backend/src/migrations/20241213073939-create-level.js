'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Levels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(10),
      },
      name: {
        type: Sequelize.STRING(50),
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

    await queryInterface.addColumn('Grammars', 'levelId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Levels',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn('VocabularyTopics', 'levelId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Levels',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Grammars', 'levelId');
    await queryInterface.removeColumn('VocabularyTopics', 'levelId');
    await queryInterface.dropTable('Levels');
  },
};
