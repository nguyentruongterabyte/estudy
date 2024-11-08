'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [
      // Question 1
      {
        groupId: 1,
        question: 'The man is holding some seafood.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 2
      {
        groupId: 1,
        question: 'The woman is talking on the phone',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 3
      {
        groupId: 1,
        question: 'The man is hammering something into a building frame.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 4
      {
        groupId: 1,
        question: 'The woman is cooking some bacon.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 5
      {
        groupId: 1,
        question: 'The man is writing something onto the notepad.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 6
      {
        groupId: 1,
        question: 'There are some tables and chairs outdoors.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
