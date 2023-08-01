'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'ProductTypes' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      name: 'clothing',
      description: 'clothing',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'seeds',
      description: 'seeds',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProductTypes', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
