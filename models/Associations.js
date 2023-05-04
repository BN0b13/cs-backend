import Cart from './Cart.js';
import Category from './Category.js';
import Contact from './Contact.js';
import Coupon from './Coupon.js';
import Inventory from './Inventory.js';
import Order from './Order.js';
import Product from './Product.js';
import Role from './Role.js';
import User from './User.js';
import Visit from './Visit.js';

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
    Inventory,
    Order,
    Product,
    Role,
    User,
    Visit
}