'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('QuestionAudios', [
      {
        questionId: 1,
        audioId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 2,
        audioId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 3,
        audioId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 4,
        audioId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 5,
        audioId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 6,
        audioId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
