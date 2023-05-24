'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Users' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      email: 'noblenotes1@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 1,
      firstName: 'Blake',
      lastName: 'Noble',
      phone: '9515149037',
      billingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      emailList: false,
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'aevans190@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 2,
      firstName: 'Andrew',
      lastName: 'Evans',
      phone: '9518333397',
      billingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      emailList: false,
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'employee@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 3,
      firstName: 'Basic',
      lastName: 'Employee',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      emailList: false,
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'employee2@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 3,
      firstName: '2Basic',
      lastName: '2Employee',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      emailList: false,
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'sammydog@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 4,
      firstName: 'Sammy',
      lastName: 'Dog',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      emailList: false,
      emailVerified: true,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'sezjadog@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 4,
      firstName: 'Sezja',
      lastName: 'Dog',
      phone: '9515062534',
      billingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      shippingAddress: JSON.stringify({
        addressOne: '33579 Canyon Ranch Road',
        addressTwo: '',
        city: 'Wildomar',
        state: 'CA',
        zipCode: 92595
      }),
      emailList: false,
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
