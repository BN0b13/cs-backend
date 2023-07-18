'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';


class Configuration extends Model {
  
  static associate(models) {
    
  }
}
Configuration.init({
  url: DataTypes.STRING,
  companyName: DataTypes.STRING,
  companyPhoneOn: DataTypes.STRING,
  companyPhone: DataTypes.INTEGER,
  companyPhoneExt: DataTypes.INTEGER,
  companyEmailOn: DataTypes.BOOLEAN,
  companyEmail: DataTypes.STRING,
  companyShippingEmail: DataTypes.STRING,
  companyShippingAddressOn: DataTypes.BOOLEAN,
  companyShippingAddress: DataTypes.JSON,
  companyBillingAddress: DataTypes.JSON,
  customerServiceOn: DataTypes.BOOLEAN,
  customerServicePhone: DataTypes.INTEGER,
  customerServicePhoneExt: DataTypes.INTEGER,
  customerServiceEmail: DataTypes.STRING,
  deliveryInsuranceOn: DataTypes.BOOLEAN,
  deliveryInsuranceAmount: DataTypes.INTEGER,
  deliveryInsuranceDescription: DataTypes.STRING,
  ageVerifyOn: DataTypes.BOOLEAN,
  ageVerifyAgeLimit: DataTypes.INTEGER,
  inventoryReminderOn: DataTypes.BOOLEAN,
  inventoryFrequency: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Configuration',
});

export default Configuration;