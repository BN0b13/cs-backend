'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Eula extends Model {
  
  static associate(models) {
    
  }
}
Eula.init({
  eula: DataTypes.TEXT,
  version: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Eula',
});

export default Eula;