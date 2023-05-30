const productArr = [{
    categoryId: 1,
    name: "Over Dosi",
    details: JSON.stringify({
      description: "Over Dosi brings the power of Dosidos and Gelato to its apex. With a hint of Mint Chocolate Chip, this combination is sure to get people talking!",
      time: "9-10 weeks",
      mother: "Dosidos OG",
      father: "It's It",
      profile: ["Sweet", "Orange", "OG"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 0
  },
  {
    categoryId: 1,
    name: "Muff Pounder",
    details: JSON.stringify({
      description: "Purple frosted spears take this strain to the next level.",
      time: "8-9 weeks",
      mother: "Blueberry Muffin",
      father: "Cherry Pound Cake",
      profile: ["Sweet", "Berry"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 0
  },
  {
    categoryId: 1,
    name: "Slush Puppies",
    details: JSON.stringify({
      description: "The colas on these frozen puppies are so thick they require support!",
      time: "9-10 weeks",
      mother: "Slurrup",
      father: "Cinderella 99",
      profile: ["Sweet", "Meat"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 0
  },
  {
    categoryId: 1,
    name: "GMO Sugar Haze",
    details: JSON.stringify({
      description: "A single seed came from our experiment with feminizing seeds, resulting in this frosty and chemical smelling strain.",
      time: "8-9 weeks",
      mother: "GMO x Hazy Lady",
      father: "Sugar Cane",
      profile: ["Sweet", "Meat"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 0
  },
  // GHOST
  {
    categoryId: 2,
    name: "Ectoplasm",
    details: JSON.stringify({
      description: "Hella scary! This strain is oozing with bone chilling dankness.",
      time: "8-9 weeks",
      mother: "Hella Jelly",
      father: "Casper OG",
      profile: ["Sweet", "OG"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 10
  },
  {
    categoryId: 2,
    name: "Specter Cane",
    details: JSON.stringify({
      description: "This is the embodiment of sugar, come back from the grave! Not a bad haunting to have.",
    time: "8-9 weeks",
    mother: "Sugar Cane",
    father: "Casper OG",
    profile: ["Earthy", "OG"],
    sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 10
  },
  {
    categoryId: 2,
    name: "Dead Muff OG",
    details: JSON.stringify({
      description: "The battle between berry and ghost made us all winners.",
      time: "8-9 weeks",
      mother: "Blueberry Muffin",
      father: "Casper OG",
      profile: ["Berry", "OG"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 20
  },
  {
    categoryId: 2,
    name: "Dead Diesel",
    details: JSON.stringify({
      description: "Sour diesel with a stunning display of OG goodness.",
      time: "8-9 weeks",
      mother: "Sour Diesel",
      father: "Casper OG",
      profile: ["Sour", "Diesel", "OG"],
      sex: "Regular"
    }),
    image: [''],
    price: 6000,
    serialized: true,
    quantity: 15
  },
];

const products = () => {
  return productArr.map(product => {
    return {
      categoryId: product.categoryId,
      name: product.name,
      details: product.details,
      image: product.image,
      price: product.price,
      serialized: product.serialized,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
}

const inventory = () => {
    let inventoryArr = [];
    productArr.map((product, index) => {
        if(product.quantity === 0) {
            return inventoryArr.push({
                productId: index + 1,
                sku: `${index + 1}.1`,
                address: '',
                bay: '',
                available: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        for(let i = 0; i < product.quantity; i++) {
            inventoryArr.push({
                productId: index + 1,
                sku: `${index + 1}.${i + 1}`,
                address: '',
                bay: '',
                available: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    });
    return inventoryArr;
}

module.exports = {
  inventory: inventory(),
  products: products()
};