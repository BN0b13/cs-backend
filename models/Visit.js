'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Visit extends Model {
  
  static associate(models) {
    
  }
}
Visit.init({
  count: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Visit',
});

export default Visit;