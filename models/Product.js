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
  description: DataTypes.STRING,
  type: DataTypes.STRING,
  time: DataTypes.STRING,
  mother: DataTypes.STRING,
  father: DataTypes.STRING,
  profile: DataTypes.ARRAY(DataTypes.INTEGER),
  sex: DataTypes.STRING,
  price: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Product',
});

export default Product;