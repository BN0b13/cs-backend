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
  refId: DataTypes.STRING,
  products: DataTypes.ARRAY(Sequelize.JSON),
  total: DataTypes.INTEGER,
  billingAddress: DataTypes.JSON,
  shippingAddress: DataTypes.JSON,
  shipping: DataTypes.INTEGER,
  deliveryInsurance: DataTypes.BOOLEAN,
  couponId: DataTypes.INTEGER,
  status: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Order',
});


  
export default Order;