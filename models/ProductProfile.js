'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';


class ProductProfile extends Model {
  
  static associate(models) {
    
  }
}
ProductProfile.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  filename: DataTypes.STRING,
  path: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'ProductProfile',
});

export default ProductProfile;