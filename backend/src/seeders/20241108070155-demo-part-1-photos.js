'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [
      // Question 1
      {
        questionId: 1,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/3555841_1562638435196.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 2
      {
        questionId: 2,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/5656089_1562638419203.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 3
      {
        questionId: 3,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/5911589_1562638438001.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 4
      {
        questionId: 4,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/3672944_1562638433179.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 5
      {
        questionId: 5,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/6539040_1562638443130.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 6
      {
        questionId: 6,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/973355_1562638439675.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
