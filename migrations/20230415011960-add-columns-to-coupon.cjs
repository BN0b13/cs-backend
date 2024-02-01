'use strict';

const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Coupons' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          table,
          'active',
          {
            type: Sequelize.BOOLEAN
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'value',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'type',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'expiration',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'expirationType',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'count',
          {
            type: Sequelize.STRING
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'categoryId',
          {
            type: Sequelize.INTEGER
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'productId',
          {
            type: Sequelize.INTEGER
          },
          {
            transaction: t
          }),
    
        queryInterface.addColumn(
          table,
          'inventoryId',
          {
            type: Sequelize.INTEGER
          },
          {
            transaction: t
          }),
    
        queryInterface.removeColumn(
          table,
          'percentOff',
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
          'active',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'value',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'type',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'expiration',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'expirationType',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'count',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'categoryId',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'productId',
          {
            transaction: t
          }),

        queryInterface.removeColumn(
          table,
          'inventoryId',
          {
            transaction: t
          }),

        queryInterface.addColumn(
          table,
          'percentOff',{
            type: Sequelize.INTEGER
          },
          {
            transaction: t
          })
        ])
    });
  }
};
