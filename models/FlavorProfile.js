'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';


class FlavorProfile extends Model {
  
  static associate(models) {
    
  }
}
FlavorProfile.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  filename: DataTypes.STRING,
  path: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'FlavorProfile',
});

export default FlavorProfile;