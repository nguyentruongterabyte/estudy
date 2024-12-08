'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'photoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Photos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn( 'Users', 'photoId' );
  }
};
