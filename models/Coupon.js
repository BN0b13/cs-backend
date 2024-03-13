'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Coupon extends Model {
  
  static associate(models) {
    
  }
}
Coupon.init({
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  type: DataTypes.BOOLEAN,
  value: DataTypes.STRING,
  type: DataTypes.STRING,
  expiration: DataTypes.STRING,
  expirationType: DataTypes.STRING,
  count: DataTypes.STRING,
  categoryId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  inventoryId: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Coupon',
});

export default Coupon;