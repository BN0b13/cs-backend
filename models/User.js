'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  roleId: DataTypes.INTEGER,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zipCode: DataTypes.INTEGER,
  emailList: DataTypes.BOOLEAN,
  emailVerified: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'User',
});

export default User;