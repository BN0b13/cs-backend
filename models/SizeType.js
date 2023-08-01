'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class SizeType extends Model {
  
  static associate(models) {
    
  }
}
SizeType.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'SizeType',
});
  
export default SizeType;