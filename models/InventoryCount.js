'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class InventoryCount extends Model {
  
  static associate(models) {
    
  }
}
InventoryCount.init({
  employeeId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  sku: DataTypes.STRING,
  address: DataTypes.STRING,
  bay: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'InventoryCount',
});
  
export default InventoryCount;