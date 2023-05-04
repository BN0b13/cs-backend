'use strict';
const seederHelper = require('../services/SeederHelper.cjs');
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Inventories' };
const inventory = seederHelper.inventory;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, inventory, { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Inventories', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
