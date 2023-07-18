'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';


class ProductType extends Model {
  
  static associate(models) {
    
  }
}
ProductType.init({
  type: DataTypes.STRING,
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'ProductType',
});

export default ProductType;