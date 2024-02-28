'use strict';

const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Orders' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          table,
          'paymentType',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
      ])
    });
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          table,
          'paymentType',
          {
            transaction: t
          })
        ])
    });
  }
};
