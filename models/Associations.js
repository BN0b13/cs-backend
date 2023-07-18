import Cart from './Cart.js';
import Category from './Category.js';
import Contact from './Contact.js';
import Coupon from './Coupon.js';
import FlavorProfile from './FlavorProfile.js';
import Inventory from './Inventory.js';
import Order from './Order.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import ProductType from './ProductType.js';
import Role from './Role.js';
import Theme from './Theme.js';
import User from './User.js';
import Visit from './Visit.js';
import WelcomeImage from './WelcomeImage.js';

Category.hasMany(Product, {
    foreignKey:{
        allowNull: false, 
        name:'categoryId'
    }
});

Contact.hasOne(User, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    }
});

Product.hasOne(Category, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'categoryId'
});

Product.hasMany(ProductImage, {
    foreignKey:{
        allowNull: false, 
        name:'productId'
    }
});

Product.hasMany(Inventory, {
    foreignKey:{
        allowNull: false, 
        name:'productId'
    }
});

User.hasOne(Cart, {
    foreignKey:{
        allowNull: false, 
        name:'userId'
    }
});

User.hasMany(Order, {
    foreignKey:{
        allowNull: false, 
        name:'userId'
    }
});
  
User.hasOne(Role, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'roleId'
});

export {
    Cart,
    Category,
    Contact,
    Coupon,
    FlavorProfile,
    Inventory,
    Order,
    Product,
    ProductImage,
    ProductType,
    Role,
    Theme,
    User,
    Visit,
    WelcomeImage
}