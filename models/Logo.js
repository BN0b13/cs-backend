'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class Logo extends Model {
  
  static associate(models) {
    
  }
}
Logo.init({
  name: DataTypes.STRING,
  logoTypeId: DataTypes.INTEGER,
  filename: DataTypes.STRING,
  path: DataTypes.STRING,
  link: DataTypes.STRING,
  active: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Logo',
});
  
export default Logo;