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
  percentOff: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Coupon',
});

export default Coupon;