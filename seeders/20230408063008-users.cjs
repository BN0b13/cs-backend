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
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'aevans190@gmail.com',
      emailOriginal: 'aevans190@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 2,
      firstName: 'Andrew',
      lastName: 'Evans',
      phone: '9518333397',
      billingAddress: JSON.stringify({
        firstName: 'Andrew',
        lastName: 'Evans',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        firstName: 'Andrew',
        lastName: 'Evans',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'employee@gmail.com',
      emailOriginal: 'employee@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 3,
      firstName: 'Basic',
      lastName: 'Employee',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        firstName: 'Basic',
        lastName: 'Employee',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        firstName: 'Basic',
        lastName: 'Employee',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'employee2@gmail.com',
      emailOriginal: 'employee2@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 3,
      firstName: '2Basic',
      lastName: '2Employee',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        firstName: '2Basic',
        lastName: '2Employee',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        firstName: '2Basic',
        lastName: '2Employee',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'sammydog@gmail.com',
      emailOriginal: 'sammydog@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 4,
      firstName: 'Sammy',
      lastName: 'Dog',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        firstName: 'Sammy',
        lastName: 'Dog',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        firstName: 'Sammy',
        lastName: 'Dog',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'sezjadog@gmail.com',
      emailOriginal: 'sezjadog@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 4,
      firstName: 'Sezja',
      lastName: 'Dog',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        firstName: 'Sezja',
        lastName: 'Dog',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        firstName: 'Sezja',
        lastName: 'Dog',
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
