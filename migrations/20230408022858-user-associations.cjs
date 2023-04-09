'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.changeColumn(
    //   'Users', 
    //   'roleId', 
    //   {
    //     type: Sequelize.INTEGER,
    //     references: { model: 'Roles', key: 'id'}
    //   }, 
    //   { 
    //     schema: process.env.PG_SCHEMA_NAME 
    //   });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('Users');
  }
};
