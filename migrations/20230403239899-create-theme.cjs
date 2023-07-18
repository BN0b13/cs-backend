'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Themes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      colorPrimary: {
        type: Sequelize.STRING
      },
      colorSecondary: {
        type: Sequelize.STRING
      },
      textPrimary: {
        type: Sequelize.STRING
      },
      textSecondary: {
        type: Sequelize.STRING
      },
      backgroundColor: {
        type: Sequelize.STRING
      },
      backgroundImage: {
        type: Sequelize.STRING
      },
      backgroundImageOn: {
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
    await queryInterface.dropTable('Themes');
  }
};