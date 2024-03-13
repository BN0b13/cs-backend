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
  billingAddress: DataTypes.JSONB,
  shippingAddress: DataTypes.JSONB,
  favorites: DataTypes.ARRAY(DataTypes.INTEGER),
  subscriptions: DataTypes.ARRAY(DataTypes.INTEGER),
  emailVerified: DataTypes.BOOLEAN,
  emailToken: DataTypes.STRING,
  passwordToken: DataTypes.STRING,
  credit: DataTypes.INTEGER,
  themeId: DataTypes.INTEGER,
  themeInverted: DataTypes.BOOLEAN,
  eula: DataTypes.BOOLEAN,
  eulaVersion: DataTypes.STRING,
  socials: DataTypes.JSONB,
  username: DataTypes.STRING,
  profilePictureName: DataTypes.STRING,
  profilePicturePath: DataTypes.STRING,
  status: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'User',
});

export default User;