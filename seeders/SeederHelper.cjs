const productArr = [{
    categoryId: 2,
    name: "Ectoplasm",
    description: "The fastest finishing Sativa leaning OG we have ever created. Fruity and OG terpenes dominate any room these plants are in.",
    time: "7-8 weeks",
    mother: "Hella Jelly",
    father: "Casper OG",
    profile: [1],
    quantity: 80
  },
  {
    categoryId: 2,
    name: "Specter Cane",
    description: "Spectacularly sugary buds explode out of this OG. Perfect for making extracts.",
    time: "8-9 weeks",
    mother: "Sugar Cane",
    father: "Casper OG",
    profile: [1],
    quantity: 30
  },
  {
    categoryId: 2,
    name: "Dead Muff OG",
    description: "Fast, fruity and potent. This strain produces purple and light green buds and most phenotypes finish around week 7.",
    time: "7-8 weeks",
    mother: "Blueberry Muffin",
    father: "Casper OG",
    profile: [1],
    quantity: 25
  },
  {
    categoryId: 2,
    name: "Undead Diesel",
    description: "Sour Diesel in a Gelato package, Undead Diesel is the OG answer to this crazy diesel strain.",
    time: "8-9 weeks",
    mother: "It's Sour",
    father: "Casper OG",
    profile: [1],
    quantity: 45
  },
  {
    categoryId: 2,
    name: "Muff Pounder OG",
    description: "Muff Pounder OG is the purple, potent and huge yielding combination of Blueberry Muffin and Cherry Pound Cake and Casper OG.",
    time: "8-9 weeks",
    mother: "Muff Pounder",
    father: "Casper OG",
    profile: [1],
    quantity: 50
  },
  {
    categoryId: 2,
    name: "Demon Dawg",
    description: "Demon Dawg is the evil combination of Star 95 and Casper OG. Expect caustic Chem and OG terpenes.",
    time: "8-10 weeks",
    mother: "Star 95",
    father: "Casper OG",
    profile: [1],
    quantity: 20
  },
  {
    categoryId: 2,
    name: "Over Dosi OG",
    description: "Orange and OG terpenes with frosty and velvety buds, this is the perfect strain for everyone.",
    time: "8-9 weeks",
    mother: "Over Dosi",
    father: "Casper OG",
    profile: [1],
    quantity: 30
  },
  {
    categoryId: 2,
    name: "The Upside Down",
    description: "Extremely fast finisher with insane pineapple and vanilla terpenes. This OG is on the tall side but still suitable for indoors.",
    time: "7-8 weeks",
    mother: "Pineapple Upside Down Cake",
    father: "Casper OG",
    profile: [1],
    quantity: 45
  },
  {
    categoryId: 2,
    name: "Deadwreck OG",
    description: "It's Trainwreck with a lot of OG! Deadwreck OG supports an impressive heritage of Fruity Pebbles OG, Ghost OG and Face Off OG and of course, Trainwreck.",
    time: "8-9 weeks",
    mother: "Train Wreck OG",
    father: "Casper OG",
    profile: [1],
    quantity: 80
  },
  {
    categoryId: 2,
    name: "EVP OG",
    description: "Boasting a powerful combination of Bubba Kush: Peyote cut, The White and Fire OG from the mother and Ghost OG and Face Off Og from the father, EVP OG is the essential strain for even the pickiest OG lover.",
    time: "8-10 weeks",
    mother: "Peyote WiFi",
    father: "Casper OG",
    profile: [1],
    quantity: 25
  },
  {
    categoryId: 2,
    name: "Haunter Haze",
    description: "Haunter haze is the essential Haze and OG combination. The Ghost OG genetics really shine out in this fantastic cross of old and new.",
    time: "8-10 weeks",
    mother: "Ghost Train Haze",
    father: "Casper OG",
    profile: [1],
    quantity: 70
  },
  {
    categoryId: 2,
    name: "Planet of the Dead",
    description: "Planet of the Dead boasts an extreme grape profile held up by it's Chem and OG ancestry. Be warned, this strain has the potential to create deadly potent rock-like colas.",
    time: "8-9 weeks",
    mother: "Planet of the Grapes",
    father: "Casper OG",
    profile: [1],
    quantity: 50
  },
  {
    categoryId: 2,
    name: "GhostfruitZ",
    description: "A potent ZkittleZ, Grapefruit Gum and OG strain with deliciously fruity terpenes.",
    time: "8-10 weeks",
    mother: "GrapefruitZ",
    father: "Casper OG",
    profile: [1],
    quantity: 25
  },
  {
    categoryId: 2,
    name: "Casper Chem",
    description: "The ultimate Chem, Cookie and OG hybrid, Casper Chem produces the most beautiful buds with eye watering terpenes.",
    time: "8-9 weeks",
    mother: "Supreme Chem Gelatti",
    father: "Casper OG",
    profile: [1],
    quantity: 65
  },
  {
    categoryId: 2,
    name: "Venom Death",
    description: "Mostly OG strain with Bruce Banner's Strawberry Diesel heritage shinning though. Expect fuel and OG terpenes.",
    time: "8-9 weeks",
    mother: "Symbiote",
    father: "Casper OG",
    profile: [1],
    quantity: 45
  },
  {
    categoryId: 2,
    name: "Dosi Double OG",
    description: "The perfect balance of Do-si-dos and OG. Sweet and giant colas with very light green, frosty buds. Pure beauty.",
    time: "8-9 weeks",
    mother: "Do-si-dos OG",
    father: "Casper OG",
    profile: [1],
    quantity: 50
  },
  {
    categoryId: 2,
    name: "Zombiez OG",
    description: "Zombiez OG earned the Z at the end of it's name from the heavy Zkittles influence from it's mother. Most phenotypes will finish around the 7 week mark making this fruity OG mixture an extremely fast and efficient strain.",
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
      details: JSON.stringify({
        time: product.time,
        height: "",
        yield: "",
        environment: "",
        mother: product.mother,
        motherProductId: null,
        father: product.father,
        fatherProductId: null
      }),
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
        address: null,
        bay: '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    return inventoryArr;
}

const users = (params) => {
  const {
    adminCount = 1, 
    employeeCount = 1, 
    customerCount = 1, 
    contributorCount = 1, 
    driverCount = 1
  } = params;
  
  let userArr = [{
    email: 'noblenotes1@gmail.com',
    emailOriginal: 'noblenotes1@gmail.com',
    username: 'bnoble',
    password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
    roleId: 1,
    firstName: 'Blake',
    lastName: 'Noble',
    phone: '9515149037',
    billingAddress: JSON.stringify({
      firstName: 'Blake',
      lastName: 'Noble',
      addressOne: '33579 Canyon Ranch Road',
      addressTwo: '',
      city: 'Wildomar',
      state: 'CA',
      zipCode: 92595
    }),
    shippingAddress: JSON.stringify({
      firstName: 'Blake',
      lastName: 'Noble',
      addressOne: '33579 Canyon Ranch Road',
      addressTwo: '',
      city: 'Wildomar',
      state: 'CA',
      zipCode: 92595
    }),
    favorites: [0],
    subscriptions: [0],
    emailVerified: false,
    emailToken: null,
    passwordToken: null,
    credit: 0,
    themeId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }];

  for(let i = 0; i < adminCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    userArr.push({
      email: `Admin-${i}-email@gmail.com`,
      emailOriginal: `Admin-${i}-email@gmail.com`,
      username: `Admin-${i}`,
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 2,
      firstName: `Admin-${i}-firstName`,
      lastName: `Admin-${i}-lastName`,
      phone: '5555555555',
      billingAddress: JSON.stringify({
        firstName: `Admin-${i}-firstName`,
        lastName: `Admin-${i}-lastName`,
        addressOne: `Admin-${i}-addressOne`,
        addressTwo: '',
        city: `Admin-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      shippingAddress: JSON.stringify({
        firstName: `Admin-${i}-firstName`,
        lastName: `Admin-${i}-lastName`,
        addressOne: `Admin-${i}-addressOne`,
        addressTwo: '',
        city: `Admin-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: date,
      updatedAt: date
    });
  }

  for(let i = 0; i < employeeCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i + adminCount));
    userArr.push({
      email: `Employee-${i}-email@gmail.com`,
      emailOriginal: `Employee-${i}-email@gmail.com`,
      username: `Employee-${i}`,
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 3,
      firstName: `Employee-${i}-firstName`,
      lastName: `Employee-${i}-lastName`,
      phone: '5555555555',
      billingAddress: JSON.stringify({
        firstName: `Employee-${i}-firstName`,
        lastName: `Employee-${i}-lastName`,
        addressOne: `Employee-${i}-addressOne`,
        addressTwo: '',
        city: `Employee-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      shippingAddress: JSON.stringify({
        firstName: `Employee-${i}-firstName`,
        lastName: `Employee-${i}-lastName`,
        addressOne: `Employee-${i}-addressOne`,
        addressTwo: '',
        city: `Employee-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: date,
      updatedAt: date
    });
  }

  for(let i = 0; i < customerCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i + adminCount + employeeCount));
    userArr.push({
      email: `Customer-${i}-email@gmail.com`,
      emailOriginal: `Customer-${i}-email@gmail.com`,
      username: `Customer-${i}`,
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 4,
      firstName: `Customer-${i}-firstName`,
      lastName: `Customer-${i}-lastName`,
      phone: '5555555555',
      billingAddress: JSON.stringify({
        firstName: `Customer-${i}-firstName`,
        lastName: `Customer-${i}-lastName`,
        addressOne: `Customer-${i}-addressOne`,
        addressTwo: '',
        city: `Customer-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      shippingAddress: JSON.stringify({
        firstName: `Customer-${i}-firstName`,
        lastName: `Customer-${i}-lastName`,
        addressOne: `Customer-${i}-addressOne`,
        addressTwo: '',
        city: `Customer-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: date,
      updatedAt: date
    });
  }

  for(let i = 0; i < driverCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i + adminCount + employeeCount + customerCount));
    userArr.push({
      email: `Driver-${i}-email@gmail.com`,
      emailOriginal: `Driver-${i}-email@gmail.com`,
      username: `Driver-${i}`,
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 6,
      firstName: `Driver-${i}-firstName`,
      lastName: `Driver-${i}-lastName`,
      phone: '5555555555',
      billingAddress: JSON.stringify({
        firstName: `Driver-${i}-firstName`,
        lastName: `Driver-${i}-lastName`,
        addressOne: `Driver-${i}-addressOne`,
        addressTwo: '',
        city: `Driver-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      shippingAddress: JSON.stringify({
        firstName: `Driver-${i}-firstName`,
        lastName: `Driver-${i}-lastName`,
        addressOne: `Driver-${i}-addressOne`,
        addressTwo: '',
        city: `Driver-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: date,
      updatedAt: date
    });
  }

  for(let i = 0; i < contributorCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i + adminCount + employeeCount + customerCount + driverCount));
    userArr.push({
      email: `Contributor-${i}-email@gmail.com`,
      emailOriginal: `Contributor-${i}-email@gmail.com`,
      username: `Contributor-${i}`,
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 5,
      firstName: `Contributor-${i}-firstName`,
      lastName: `Contributor-${i}-lastName`,
      phone: '5555555555',
      billingAddress: JSON.stringify({
        firstName: `Contributor-${i}-firstName`,
        lastName: `Contributor-${i}-lastName`,
        addressOne: `Contributor-${i}-addressOne`,
        addressTwo: '',
        city: `Contributor-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      shippingAddress: JSON.stringify({
        firstName: `Contributor-${i}-firstName`,
        lastName: `Contributor-${i}-lastName`,
        addressOne: `Contributor-${i}-addressOne`,
        addressTwo: '',
        city: `Contributor-${i}-city`,
        state: 'CA',
        zipCode: 99999
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: date,
      updatedAt: date
    });
  }

  return userArr;
}

module.exports = {
  inventory: inventory(),
  products: products(),
  users
};