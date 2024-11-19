'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('CorrectAnswers', [
      {
        questionId: 1,
        answerId: 1,
        explain: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 2,
        answerId: 5,
        explain: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 3,
        answerId: 10,
        explain: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 4,
        answerId: 13,
        explain: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 5,
        answerId: 20,
        explain: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 6,
        answerId: 21,
        explain: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
