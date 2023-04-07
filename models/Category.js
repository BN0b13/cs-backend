'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Category extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Category.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  status: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Category',
});

export default Category;