'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Roles' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      role: 'contributor',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 'driver',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
