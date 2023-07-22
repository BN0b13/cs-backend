'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'LogoTypes' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      type: 'header',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'mobile-menu',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'welcome',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'about',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'background',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('LogoTypes', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
