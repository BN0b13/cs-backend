'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';

class Product extends Model {
  
  static associate(models) {
    
  }
}
Product.init({
  categoryId: DataTypes.INTEGER,
  type: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  details: DataTypes.JSONB,
  profile: DataTypes.ARRAY(DataTypes.INTEGER)
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Product',
});

export default Product;