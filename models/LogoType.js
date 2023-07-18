'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class LogoType extends Model {
  
  static associate(models) {
    
  }
}
LogoType.init({
  type: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'LogoType',
});
  
export default LogoType;