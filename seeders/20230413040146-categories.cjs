'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Categories' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      name: 'Our Genetics',
      description: `Descriptions of Cosmic Strains genetics`,
      type: 'seeds',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        motherProductId: null,
        fatherProductId: null,
      }),
      status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ghost',
      description: `This line was created from Casper OG pollen. Due to a rising demand and interest, this will be our first limited time strain available to the public.`,
      type: 'seeds',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        motherProductId: null,
        fatherProductId: null,
      }),
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};