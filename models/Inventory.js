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
  quantity: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Inventory',
});
  
export default Inventory;