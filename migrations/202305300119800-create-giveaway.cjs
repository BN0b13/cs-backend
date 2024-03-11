'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Giveaways', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER
      },
      entries: {
        type: Sequelize.JSONB
      },
      winners: {
        type: Sequelize.JSONB
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      disclaimer: {
        type: Sequelize.STRING
      },
      rules: {
        type: Sequelize.JSONB
      },
      prizes: {
        type: Sequelize.JSONB
      },
      type: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      expirationDate: {
        type: Sequelize.STRING
      },
      completionDate: {
        type: Sequelize.STRING
      },
      entryLimit: {
        type: Sequelize.INTEGER
      },
      entryType: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.JSONB
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
    await queryInterface.dropTable('Giveaways');
  }
};