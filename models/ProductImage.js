'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class ProductImage extends Model {
  
  static associate(models) {
    
  }
}
ProductImage.init({
  productId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  filename: DataTypes.STRING,
  path: DataTypes.STRING,
  link: DataTypes.STRING,
  position: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'ProductImage',
});
  
export default ProductImage;