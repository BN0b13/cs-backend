'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Page extends Model {
  
  static associate(models) {
    
  }
}
Page.init({
  type: DataTypes.STRING,
  url: DataTypes.STRING,
  title: DataTypes.STRING,
  titleOn: DataTypes.BOOLEAN,
  image: DataTypes.STRING,
  imageCaption: DataTypes.STRING,
  imageOn: DataTypes.BOOLEAN,
  subtitle: DataTypes.STRING,
  subtitleOn: DataTypes.BOOLEAN,
  paragraph: DataTypes.STRING,
  paragraphOn: DataTypes.BOOLEAN,
  position: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Page',
});

export default Page;