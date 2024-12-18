'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'OTP', {
      type: Sequelize.STRING(7),
    });

    await queryInterface.addColumn('Users', 'OTPExpiresAt', {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn('Users', 'OTPAttempts', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'OTP');
    await queryInterface.removeColumn('Users', 'OTPExpiresAt');
    await queryInterface.removeColumn('Users', 'OTPAttempts');
  },
};
