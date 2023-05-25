'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class User extends Model {
  
  static associate(models) {

  }
}
User.init({
  email: DataTypes.STRING,
  emailOriginal: DataTypes.STRING,
  password: DataTypes.STRING,
  roleId: DataTypes.INTEGER,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  phone: DataTypes.STRING,
  billingAddress: DataTypes.JSON,
  shippingAddress: DataTypes.JSON,
  subscriptions: DataTypes.ARRAY(DataTypes.INTEGER),
  emailVerified: DataTypes.BOOLEAN,
  emailToken: DataTypes.STRING,
  passwordToken: DataTypes.STRING,
  credit: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'User',
});

export default User;