'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Configurations' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      url: 'CosmicStrains.com',
      companyName: 'Cosmic Strains',
      companyPhoneOn: false,
      companyPhone: null,
      companyPhoneExt: null,
      companyEmailOn: false,
      companyEmail: 'sales@cosmicstrains.com',
      companyShippingEmail: 'sales@cosmicstrains.com',
      companyShippingAddressOn: false,
      companyShippingAddress: JSON.stringify({
        firstName: 'Cosmic',
        lastName: 'Strains',
        addressOne: '3400 Cottage Way',
        addressTwo: 'Ste G2 #18240',
        city: 'Sacramento',
        state: 'CA',
        zipCode: 95825
      }),
      companyBillingAddress: JSON.stringify({
        firstName: 'Cosmic',
        lastName: 'Strains',
        addressOne: '3400 Cottage Way',
        addressTwo: 'Ste G2 #18240',
        city: 'Sacramento',
        state: 'CA',
        zipCode: 95825
      }),
      customerServiceOn: false,
      customerServicePhone: null,
      customerServicePhoneExt: null,
      customerServiceEmail: 'sales@cosmicstrains.com',
      deliveryInsuranceOn: true,
      deliveryInsuranceAmount: 999,
      deliveryInsuranceDescription: '',
      ageVerifyOn: true,
      ageVerifyAgeLimit: 21,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
