'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ROLES_LIST } = require( '../config/rolesList' );
module.exports = {

  async up (queryInterface, Sequelize) {
    const roleDetails = ROLES_LIST.map( role => ( {
      userId: 1,
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date()
    } ) );

    await queryInterface.bulkInsert('RoleDetails', roleDetails, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'RoleDetails', {
      userId: 1
    }, {} );
  }
};
