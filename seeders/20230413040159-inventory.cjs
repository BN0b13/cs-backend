'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Inventories' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quantity: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Inventories', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
