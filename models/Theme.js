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
  colorPrimary: DataTypes.STRING,
  colorSecondary: DataTypes.STRING,
  textPrimary: DataTypes.STRING,
  textSecondary: DataTypes.STRING,
  backgroundColor: DataTypes.STRING,
  backgroundImage: DataTypes.STRING,
  backgroundImageOn: DataTypes.BOOLEAN,
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Theme',
});

export default Theme;