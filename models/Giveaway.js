'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Giveaway extends Model {
  
  static associate(models) {
    
  }
}
Giveaway.init({
  userId: DataTypes.INTEGER,
  companyId: DataTypes.INTEGER,
  entries: DataTypes.JSONB,
  winners: DataTypes.JSONB,
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  disclaimer: DataTypes.STRING,
  rules: DataTypes.JSONB,
  prizes: DataTypes.JSONB,
  type: DataTypes.STRING,
  startDate: DataTypes.STRING,
  expirationDate: DataTypes.STRING,
  completionDate: DataTypes.STRING,
  entryLimit: DataTypes.INTEGER,
  entryType: DataTypes.STRING,
  status: DataTypes.STRING,
  options: DataTypes.JSONB,
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Giveaway',
});

export default Giveaway;