'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { sequelize } from '../db.js';

class Order extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Order.belongsTo(models.User, {foreignKey: 'id', as: 'user'});
  }
}
Order.init({
  userId: DataTypes.INTEGER,
  products: DataTypes.ARRAY(Sequelize.INTEGER),
  total: DataTypes.INTEGER,
  couponId: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Order',
});
  
export default Order;