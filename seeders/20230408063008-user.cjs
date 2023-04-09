'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'noblenotes1@gmail.com',
      password: '123456',
      roleId: 1,
      firstName: 'Blake',
      lastName: 'Noble',
      phone: '9515149037',
      address: '33579 Canyon Ranch Road',
      city: 'Wildomar',
      state: 'CA',
      zipCode: 92595,
      emailList: false,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
