const productArr = [{
    categoryId: 1,
    name: "Over Dosi",
    description: "Over Dosi brings the power of Dosidos and Gelato to its apex. With a hint of Mint Chocolate Chip, this combination is sure to get people talking!",
    time: "9-10 weeks",
    mother: "Dosidos OG",
    father: "It's It",
    profile: [1],
    quantity: 0
  },
  {
    categoryId: 1,
    name: "Muff Pounder",
    description: "Purple frosted spears take this strain to the next level.",
    time: "8-9 weeks",
    mother: "Blueberry Muffin",
    father: "Cherry Pound Cake",
    profile: [1],
    quantity: 0
  },
  {
    categoryId: 1,
    name: "Slush Puppies",
    description: "The colas on these frozen puppies are so thick they require support!",
    time: "9-10 weeks",
    mother: "Slurrup",
    father: "Cinderella 99",
    profile: [1],
    quantity: 0
  },
  {
    categoryId: 1,
    name: "GMO Sugar Haze",
    description: "A single seed came from our experiment with feminizing seeds, resulting in this frosty and chemical smelling strain.",
    time: "8-9 weeks",
    mother: "GMO x Hazy Lady",
    father: "Sugar Cane",
    profile: [1],
    quantity: 0
  },
  // GHOST
  {
    categoryId: 2,
    name: "Ectoplasm",
    description: "",
    time: "7-8 weeks",
    mother: "Hella Jelly",
    father: "Casper OG",
    profile: [1],
    quantity: 80
  },
  {
    categoryId: 2,
    name: "Specter Cane",
    description: "",
    time: "8-9 weeks",
    mother: "Sugar Cane",
    father: "Casper OG",
    profile: [1],
    quantity: 30
  },
  {
    categoryId: 2,
    name: "Dead Muff OG",
    description: "",
    time: "7-8 weeks",
    mother: "Blueberry Muffin",
    father: "Casper OG",
    profile: [1],
    quantity: 25
  },
  {
    categoryId: 2,
    name: "Undead Diesel",
    description: "",
    time: "8-9 weeks",
    mother: "It's Sour",
    father: "Casper OG",
    profile: [1],
    quantity: 45
  },
  {
    categoryId: 2,
    name: "Muff Pounder OG",
    description: "",
    time: "8-9 weeks",
    mother: "Muff Pounder",
    father: "Casper OG",
    profile: [1],
    quantity: 50
  },
  {
    categoryId: 2,
    name: "Demon Dawg",
    description: "",
    time: "8-10 weeks",
    mother: "Star 95",
    father: "Casper OG",
    profile: [1],
    quantity: 20
  },
  {
    categoryId: 2,
    name: "Over Dosi OG",
    description: "",
    time: "8-9 weeks",
    mother: "Over Dosi",
    father: "Casper OG",
    profile: [1],
    quantity: 30
  },
  {
    categoryId: 2,
    name: "The Upside Down",
    description: "",
    time: "7-8 weeks",
    mother: "Pineapple Upside Down Cake",
    father: "Casper OG",
    profile: [1],
    quantity: 45
  },
  {
    categoryId: 2,
    name: "Deadwreck OG",
    description: "",
    time: "8-9 weeks",
    mother: "Train Wreck OG",
    father: "Casper OG",
    profile: [1],
    quantity: 80
  },
  {
    categoryId: 2,
    name: "EVP OG",
    description: "",
    time: "8-10 weeks",
    mother: "Peyote WiFi",
    father: "Casper OG",
    profile: [1],
    quantity: 25
  },
  {
    categoryId: 2,
    name: "Haunter Haze",
    description: "",
    time: "8-10 weeks",
    mother: "Ghost Train Haze",
    father: "Casper OG",
    profile: [1],
    quantity: 70
  },
  {
    categoryId: 2,
    name: "Planet of the Dead",
    description: "",
    time: "8-9 weeks",
    mother: "Planet of the Grapes",
    father: "Casper OG",
    profile: [1],
    quantity: 50
  },
  {
    categoryId: 2,
    name: "GhostfruitZ",
    description: "",
    time: "8-10 weeks",
    mother: "GrapefruitZ",
    father: "Casper OG",
    profile: [1],
    quantity: 25
  },
  {
    categoryId: 2,
    name: "Casper Chem",
    description: "",
    time: "8-9 weeks",
    mother: "Supreme Chem Gelatti",
    father: "Casper OG",
    profile: [1],
    quantity: 65
  },
  {
    categoryId: 2,
    name: "Venom Death",
    description: "",
    time: "8-9 weeks",
    mother: "Symbiote",
    father: "Casper OG",
    profile: [1],
    quantity: 45
  },
  {
    categoryId: 2,
    name: "Dosi Double OG",
    description: "",
    time: "8-9 weeks",
    mother: "Do-si-dos OG",
    father: "Casper OG",
    profile: [1],
    quantity: 50
  },
  {
    categoryId: 2,
    name: "Zombiez OG",
    description: "",
    time: "7-8 weeks",
    mother: "Pineapple Passion Zmoothie",
    father: "Casper OG",
    profile: [1],
    quantity: 30
  }
];

const products = () => {
  return productArr.map(product => {
    return {
      categoryId: product.categoryId,
      type: "seeds",
      name: product.name,
      description: product.description,
      time: product.time,
      mother: product.mother,
      father: product.father,
      profile: [1],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
}

const inventory = () => {
    let inventoryArr = [];
    productArr.map((product, index) => {
      return inventoryArr.push({
        productId: index + 1,
        type: "Regular",
        quantity: product.quantity,
        price: 6499,
        size: 'Full Pack',
        sizeDescription: '12 seeds',
        sku: `${index + 1}.1`,
        address: '',
        bay: '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    return inventoryArr;
}

module.exports = {
  inventory: inventory(),
  products: products()
};