'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Products' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      categoryId: 1,
      inventoryId: 1,
      name: "Over Dosi",
      description: "Over Dosi brings the power of Dosidos and Gelato to its apex. With a hint of Mint Chocolate Chip, this combination is sure to get people talking!",
      price: 6000,
      time: "9-10 weeks",
      mother: "Dosidos OG",
      father: "It's It",
      profile: ["Sweet", "Orange", "OG"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      inventoryId: 2,
      name: "Muff Pounder",
      description: "Purple frosted spears take this strain to the next level.",
      price: 6000,
      time: "8-9 weeks",
      mother: "Blueberry Muffin",
      father: "Cherry Pound Cake",
      profile: ["Sweet", "Berry"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      inventoryId: 3,
      name: "Slush Puppies",
      description: "The colas on these frozen puppies are so thick they require support!",
      price: 6000,
      time: "9-10 weeks",
      mother: "Slurrup",
      father: "Cinderella 99",
      profile: ["Sweet", "Meat"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      inventoryId: 4,
      name: "GMO Sugar Haze",
      description: "A single seed came from our experiment with feminizing seeds, resulting in this frosty and chemical smelling strain.",
      price: 6000,
      time: "8-9 weeks",
      mother: "GMO x Hazy Lady",
      father: "Sugar Cane",
      profile: ["Sweet", "Meat"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // GHOST
    {
      categoryId: 2,
      inventoryId: 5,
      name: "Ectoplasm",
      description: "Hella scary! This strain is oozing with bone chilling dankness.",
      price: 6000,
      time: "8-9 weeks",
      mother: "Hella Jelly",
      father: "Casper OG",
      profile: ["Sweet", "OG"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 2,
      inventoryId: 6,
      name: "Specter Cane",
      description: "This is the embodiment of sugar, come back from the grave! Not a bad haunting to have.",
      price: 6000,
      time: "8-9 weeks",
      mother: "Sugar Cane",
      father: "Casper OG",
      profile: ["Earthy", "OG"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 2,
      inventoryId: 7,
      name: "Dead Muff OG",
      description: "The battle between berry and ghost made us all winners.",
      price: 6000,
      time: "8-9 weeks",
      mother: "Blueberry Muffin",
      father: "Casper OG",
      profile: ["Berry", "OG"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 2,
      inventoryId: 8,
      name: "Dead Diesel",
      description: "Sour diesel with a stunning display of OG goodness.",
      price: 6000,
      time: "8-9 weeks",
      mother: "Sour Diesel",
      father: "Casper OG",
      profile: ["Sour", "Diesel", "OG"],
      sex: "Regular",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
