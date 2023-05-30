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
  name: DataTypes.STRING,
  details: DataTypes.JSON,
  image: DataTypes.ARRAY(Sequelize.STRING),
  price: DataTypes.INTEGER,
  serialized: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Product',
});

export default Product;