'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { sequelize } from '../db.js';

class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    // Product.hasOne(models.Inventory);
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