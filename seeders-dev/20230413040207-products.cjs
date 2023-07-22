'use strict';
const seederHelper = require('../services/SeederHelper.cjs');
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Products' };
const products = seederHelper.products;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, products, { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
