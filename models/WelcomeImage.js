'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class WelcomeImage extends Model {
  
  static associate(models) {
    
  }
}
WelcomeImage.init({
  name: DataTypes.STRING,
  filename: DataTypes.STRING,
  path: DataTypes.STRING,
  link: DataTypes.STRING,
  position: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'WelcomeImage',
});
  
export default WelcomeImage;