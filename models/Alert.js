'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { sequelize } from '../db.js';

class Alert extends Model {
  
  static associate(models) {
    
  }
}
Alert.init({
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  active: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Alert',
});

export default Alert;