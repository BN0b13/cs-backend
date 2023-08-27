'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Theme extends Model {
  
  static associate(models) {
    
  }
}
Theme.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  colors: DataTypes.JSONB,
  text: DataTypes.JSONB,
  images: DataTypes.JSONB,
  options: DataTypes.JSONB
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Theme',
});

export default Theme;