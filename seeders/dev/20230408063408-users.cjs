'use strict';
const seederHelper = require('../SeederHelper.cjs');
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Users' };
const userData = {
  adminCount: 3,
  employeeCount: 50,
  customerCount: 360,
  contributorCount: 15,
  driverCount: 20
};
const users = seederHelper.users(userData);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, users, { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
