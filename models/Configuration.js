'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';


class Configuration extends Model {
  
  static associate(models) {
    
  }
}
Configuration.init({
  themeId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  company: DataTypes.JSONB,
  options: DataTypes.JSONB,
  alerts: DataTypes.JSONB
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Configuration',
});

export default Configuration;