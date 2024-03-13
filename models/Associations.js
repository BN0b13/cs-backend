import Cart from './Cart.js';
import Category from './Category.js';
import Company from './Company.js';
import Configuration from './Configuration.js';
import Coupon from './Coupon.js';
import Giveaway from './Giveaway.js';
import Inventory from './Inventory.js';
import Message from './Message.js';
import Order from './Order.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import ProductProfile from './ProductProfile.js';
import Role from './Role.js';
import Sale from './Sale.js';
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

Company.hasOne(User, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'userId'
});

Configuration.hasOne(Theme, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'themeId'
});

Giveaway.hasOne(User, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'userId'
});

Giveaway.hasOne(Company, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'companyId'
});

Message.hasOne(User, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    }
});

Order.hasOne(Coupon, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'couponId'
});

Order.hasOne(Sale, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'saleId'
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

User.hasOne(Company, {
    foreignKey:{
        allowNull: false, 
        name:'userId'
    }
});

User.hasOne(Giveaway, {
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
    Company,
    Configuration,
    Coupon,
    Giveaway,
    Inventory,
    Message,
    Order,
    Product,
    ProductImage,
    ProductProfile,
    Role,
    Sale,
    Theme,
    User,
    Visit,
    WelcomeImage
}