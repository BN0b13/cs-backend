'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Orders' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'couponId', 
      {
        type: Sequelize.INTEGER,
        references: { model: 'Coupons', key: 'id'},
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });

    await queryInterface.changeColumn(
      table,
      'saleId', 
      {
        type: Sequelize.INTEGER,
        references: { model: 'Sales', key: 'id'},
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'couponId', 
      {
        type: Sequelize.INTEGER,
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
    await queryInterface.changeColumn(
      table,
      'saleId', 
      {
        type: Sequelize.INTEGER,
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  }
};
