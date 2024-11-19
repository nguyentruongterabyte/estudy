'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Audios', [
      // Question 1
      {
        audioLink: 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/51412687.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 2
      {
        audioLink: 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/94243671.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 3
      {
        audioLink: 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/66607451.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 4
      {
        audioLink: 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/65823179.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 5
      {
        audioLink: 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/55914976.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 6
      {
        audioLink: 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/51412687.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
