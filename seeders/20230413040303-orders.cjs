'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Orders' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      userId: 6,
      products: [5, 6, 7, 7, 8],
      total: 30000,
      couponId: null,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
