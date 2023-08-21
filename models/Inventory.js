'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class Inventory extends Model {
  
  static associate(models) {
    
  }
}
Inventory.init({
  productId: DataTypes.INTEGER,
  type: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  size: DataTypes.STRING,
  sizeDescription: DataTypes.STRING,
  sku: DataTypes.STRING,
  address: DataTypes.JSONB,
  bay: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Inventory',
});
  
export default Inventory;