'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Coupon extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Coupon.init({
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  percentOff: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Coupon',
});

export default Coupon;