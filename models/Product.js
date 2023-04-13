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
  inventoryId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.INTEGER,
  time: DataTypes.STRING,
  mother: DataTypes.STRING,
  father: DataTypes.STRING,
  profile: DataTypes.ARRAY(Sequelize.STRING),
  sex: DataTypes.STRING,
  image: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Product',
});

export default Product;