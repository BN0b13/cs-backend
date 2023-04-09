'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { sequelize } from '../db.js';

class Cart extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    // Cart.belongsTo(models.User);
  }
}
Cart.init({
  userId: DataTypes.INTEGER,
  products: DataTypes.ARRAY(Sequelize.INTEGER)
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Cart',
});

export default Cart;