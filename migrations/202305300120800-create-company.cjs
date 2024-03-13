'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      logoFilename: {
        type: Sequelize.STRING
      },
      logoPath: {
        type: Sequelize.STRING
      },
      socials: {
        type: Sequelize.JSONB
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      vendor: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { schema: process.env.PG_SCHEMA_NAME });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};