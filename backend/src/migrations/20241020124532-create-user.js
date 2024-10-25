'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(30)
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING(64)
      },
      phoneNumber: {
        type: Sequelize.STRING(12)
      },
      roleId: {
        defaultValue: 30001, // User
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};