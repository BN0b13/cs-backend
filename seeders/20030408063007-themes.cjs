'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Themes' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      "name": "default",
      "description": "default site theme",
      "colors": JSON.stringify({
          "primary": {
              "svg": "filter: invert(99%) sepia(14%) saturate(5%) hue-rotate(260deg) brightness(112%) contrast(100%)",
              "dark": "#000",
              "main": "#333",
              "text": "#fff",
              "light": "#fff",
              "accent": "#f4f4f4",
              "background": "#fff",
              "textSecondary": "#000",
              "backgroundOpacityDark": "0,0,0,0.6",
              "backgroundOpacityLight": "255,255,255,0.6"
          },
          "secondary": {
              "svg": "filter: invert(0%) sepia(59%) saturate(5260%) hue-rotate(21deg) brightness(94%) contrast(106%)",
              "dark": "#333",
              "main": "#fff",
              "text": "#000",
              "light": "#f4f4f4",
              "accent": "#000",
              "background": "#000",
              "textSecondary": "#fff",
              "backgroundOpacityDark": "0,0,0,0.6",
              "backgroundOpacityLight": "255,255,255,0.6"
          }
      }),
      "text": JSON.stringify({
          "font": "Segoe UI"
      }),
      "images": JSON.stringify({}),
      "options": JSON.stringify({
          "backgroundImageOn": false
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
