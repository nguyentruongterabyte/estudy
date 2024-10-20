'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert( 'Users', [ {
      firstName: 'Truong',
      lastName: 'Nguyen',
      email: 'nguyenthaitruong1223@gmail.com',
      password: '123',
      phoneNumber: '0948915051',
      createdAt: new Date(),
      updatedAt: new Date()
    } ], {} );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
