'use strict';

const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Users' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          table,
          'socials',
          {
            type: Sequelize.JSONB
          },
          {
            transaction: t
          }),
        queryInterface.addColumn(
          table,
          'username',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
        queryInterface.addColumn(
          table,
          'profilePictureName',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
        queryInterface.addColumn(
          table,
          'profilePicturePath',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
        queryInterface.addColumn(
          table,
          'status',
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
          'socials',
          {
            transaction: t
          }),
        queryInterface.removeColumn(
          table,
          'username',
          {
            transaction: t
          }),
        queryInterface.removeColumn(
          table,
          'profilePictureName',
          {
            transaction: t
          }),
        queryInterface.removeColumn(
          table,
          'profilePicturePath',
          {
            transaction: t
          }),
        queryInterface.removeColumn(
          table,
          'status',
          {
            transaction: t
          })
        ])
    });
  }
};
