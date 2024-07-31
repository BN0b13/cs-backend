'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Companies' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      userId: 1,
      name: 'Cosmic Strains',
      bio: 'Cosmic Strains is the main thang.',
      category: '',
      url: 'https://www.cosmicstrains.com',
      logoFilename: '',
      logoPath: '',
      socials: null,
      active: true,
      vendor: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
