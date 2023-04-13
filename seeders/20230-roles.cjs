'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Roles' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 'employee',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
