'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';

class Order extends Model {
  
  static associate(models) {
    
  }
}
Order.init({
  userId: DataTypes.INTEGER,
  products: DataTypes.ARRAY(Sequelize.INTEGER),
  total: DataTypes.INTEGER,
  couponId: DataTypes.INTEGER,
  status: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Order',
});


  
export default Order;