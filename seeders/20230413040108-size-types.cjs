'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'SizeTypes' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      name: 'Full Pack',
      description: `12 seeds`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SizeTypes', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
