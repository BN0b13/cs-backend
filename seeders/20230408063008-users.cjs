'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Users' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      email: 'noblenotes1@gmail.com',
      emailOriginal: 'noblenotes1@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 1,
      firstName: 'Blake',
      lastName: 'Noble',
      phone: '9515149037',
      billingAddress: JSON.stringify({
        firstName: 'Blake',
        lastName: 'Noble',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        firstName: 'Blake',
        lastName: 'Noble',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
