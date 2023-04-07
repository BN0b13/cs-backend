'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.STRING,
    replied: DataTypes.BOOLEAN
  }, {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Contact',
  });

  export default Contact;