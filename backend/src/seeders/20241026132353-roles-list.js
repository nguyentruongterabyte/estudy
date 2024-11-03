'use strict';


/** @type {import('sequelize-cli').Migration} */
const { ROLES_LIST } = require('../config/rolesList');

module.exports = {
  async up (queryInterface, Sequelize) {
    const rolesData = ROLES_LIST.map( ( role ) => ( {
      id: role.id,
      name: role.name
    } ) );

    await queryInterface.bulkInsert( 'Roles', rolesData, {} );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', {
      id: ROLES_LIST.map( role => role.id )
    }, {});
  }
};
