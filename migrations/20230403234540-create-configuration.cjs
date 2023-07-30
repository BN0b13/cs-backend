'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Configurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      companyPhoneOn: {
        type: Sequelize.BOOLEAN
      },
      companyPhone: {
        type: Sequelize.INTEGER
      },
      companyPhoneExt: {
        type: Sequelize.INTEGER
      },
      companyEmailOn: {
        type: Sequelize.BOOLEAN
      },
      companyEmail: {
        type: Sequelize.STRING
      },
      companyShippingEmail: {
        type: Sequelize.STRING
      },
      companyShippingAddressOn: {
        type: Sequelize.BOOLEAN
      },
      companyShippingAddress: {
        type: Sequelize.JSONB
      },
      companyBillingAddress: {
        type: Sequelize.JSONB
      },
      customerServiceOn: {
        type: Sequelize.BOOLEAN
      },
      customerServicePhone: {
        type: Sequelize.INTEGER
      },
      customerServicePhoneExt: {
        type: Sequelize.INTEGER
      },
      customerServiceEmail: {
        type: Sequelize.STRING
      },
      deliveryInsuranceOn: {
        type: Sequelize.BOOLEAN
      },
      deliveryInsuranceAmount: {
        type: Sequelize.INTEGER
      },
      deliveryInsuranceDescription: {
        type: Sequelize.STRING
      },
      ageVerifyOn: {
        type: Sequelize.BOOLEAN
      },
      ageVerifyAgeLimit: {
        type: Sequelize.INTEGER
      },
      inventoryReminderOn: {
        type: Sequelize.BOOLEAN
      },
      inventoryFrequency: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Configurations');
  }
};