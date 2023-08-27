'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Configurations' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'themeId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Themes', key: 'id'},
        allowNull: false
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'themeId', 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  }
};
