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
  products: DataTypes.JSONB,
  total: DataTypes.INTEGER,
  billingAddress: DataTypes.JSONB,
  shippingAddress: DataTypes.JSONB,
  shippingId: DataTypes.INTEGER,
  shippingTotal: DataTypes.INTEGER,
  deliveryInsurance: DataTypes.BOOLEAN,
  deliveryInsuranceTotal: DataTypes.INTEGER,
  couponId: DataTypes.INTEGER,
  status: DataTypes.STRING,
  paid: DataTypes.BOOLEAN,
  paymentLink: DataTypes.STRING,
  fulfilledBy: DataTypes.INTEGER,
  tracking: DataTypes.STRING,
  notes: DataTypes.TEXT
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Order',
});


  
export default Order;