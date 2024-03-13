'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Company extends Model {
  
  static associate(models) {
    
  }
}
Company.init({
  userId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  bio: DataTypes.TEXT,
  category: DataTypes.STRING,
  url: DataTypes.STRING,
  logoFilename: DataTypes.STRING,
  logoPath: DataTypes.STRING,
  socials: DataTypes.JSONB,
  active: DataTypes.BOOLEAN,
  vendor: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Company',
});

export default Company;