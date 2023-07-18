const productArr = [{
    categoryId: 1,
    name: "Over Dosi",
    description: "Over Dosi brings the power of Dosidos and Gelato to its apex. With a hint of Mint Chocolate Chip, this combination is sure to get people talking!",
    time: "9-10 weeks",
    mother: "Dosidos OG",
    father: "It's It",
    profile: ["Sweet", "Orange", "OG"],
    quantity: 0
  },
  {
    categoryId: 1,
    name: "Muff Pounder",
    description: "Purple frosted spears take this strain to the next level.",
    time: "8-9 weeks",
    mother: "Blueberry Muffin",
    father: "Cherry Pound Cake",
    profile: ["Sweet", "Berry"],
    quantity: 0
  },
  {
    categoryId: 1,
    name: "Slush Puppies",
    description: "The colas on these frozen puppies are so thick they require support!",
    time: "9-10 weeks",
    mother: "Slurrup",
    father: "Cinderella 99",
    profile: ["Sweet", "Meat"],
    quantity: 0
  },
  {
    categoryId: 1,
    name: "GMO Sugar Haze",
    description: "A single seed came from our experiment with feminizing seeds, resulting in this frosty and chemical smelling strain.",
    time: "8-9 weeks",
    mother: "GMO x Hazy Lady",
    father: "Sugar Cane",
    profile: ["Sweet", "Meat"],
    quantity: 0
  },
  // GHOST
  {
    categoryId: 2,
    name: "Ectoplasm",
    description: "Hella scary! This strain is oozing with bone chilling dankness.",
    time: "8-9 weeks",
    mother: "Hella Jelly",
    father: "Casper OG",
    profile: ["Sweet", "OG"],
    quantity: 10
  },
  {
    categoryId: 2,
    name: "Specter Cane",
    description: "This is the embodiment of sugar, come back from the grave! Not a bad haunting to have.",
    time: "8-9 weeks",
    mother: "Sugar Cane",
    father: "Casper OG",
    profile: ["Earthy", "OG"],
    quantity: 10
  },
  {
    categoryId: 2,
    name: "Dead Muff OG",
    description: "The battle between berry and ghost made us all winners.",
    time: "8-9 weeks",
    mother: "Blueberry Muffin",
    father: "Casper OG",
    profile: ["Berry", "OG"],
    quantity: 20
  },
  {
    categoryId: 2,
    name: "Dead Diesel",
    description: "Sour diesel with a stunning display of OG goodness.",
    time: "8-9 weeks",
    mother: "Sour Diesel",
    father: "Casper OG",
    profile: ["Sour", "Diesel", "OG"],
    quantity: 15
  }
];

const products = () => {
  return productArr.map(product => {
    return {
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      type: 'seeds',
      time: product.time,
      mother: product.mother,
      father: product.father,
      profile: [1],
      sex: "Regular",
      size: '12 seeds',
      price: 6000,
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
        quantity: product.quantity,
        sku: `${index + 1}.1`,
        address: '',
        bay: '',
        available: false,
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