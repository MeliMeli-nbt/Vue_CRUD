const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Account = sequelize.define('Account', {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true 
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  });

module.exports = Account;