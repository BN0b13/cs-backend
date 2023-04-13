'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { sequelize } from '../db.js';

class Cart extends Model {
  
  static associate(models) {
    
  }
}
Cart.init({
  userId: DataTypes.INTEGER,
  products: DataTypes.ARRAY(Sequelize.INTEGER)
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Cart',
});

export default Cart;