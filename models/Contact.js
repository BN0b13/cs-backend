'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

  class Contact extends Model {
    
    static associate(models) {
      
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