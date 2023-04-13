'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Products' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'categoryId', 
      {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id'},
        allowNull: false
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });

      await queryInterface.changeColumn(
        table,
        'inventoryId', 
        {
          type: Sequelize.INTEGER,
          references: { model: 'Inventories', key: 'id'},
          allowNull: false
        }, 
        { 
          schema: process.env.PG_SCHEMA_NAME 
        });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'categoryId', 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });

      await queryInterface.changeColumn(
        table,
        'inventoryId', 
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }, 
        { 
          schema: process.env.PG_SCHEMA_NAME 
        });
  }
};
