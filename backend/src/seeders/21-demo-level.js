'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Levels', [
      {
        code: 'A1',
        name: 'Beginner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'A2',
        name: 'Elementary',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'B1',
        name: 'Intermediate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'B2',
        name: 'Upper-Intermediate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'C1',
        name: 'Advanced',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'C2',
        name: 'Proficiency',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
