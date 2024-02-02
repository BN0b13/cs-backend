'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Sale extends Model {
  
  static associate(models) {
    
  }
}
Sale.init({
  categoryId: DataTypes.ARRAY(DataTypes.INTEGER),
  productId: DataTypes.ARRAY(DataTypes.INTEGER),
  inventoryId: DataTypes.ARRAY(DataTypes.INTEGER),
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  type: DataTypes.STRING,
  value: DataTypes.STRING,
  expirationDate: DataTypes.STRING,
  expirationType: DataTypes.STRING,
  count: DataTypes.INTEGER,
  active: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Sale',
});

export default Sale;