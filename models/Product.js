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
  productTypeId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  time: DataTypes.STRING,
  mother: DataTypes.STRING,
  father: DataTypes.STRING,
  profile: DataTypes.ARRAY(DataTypes.INTEGER),
  sex: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Product',
});

export default Product;