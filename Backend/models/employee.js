const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Account = require('./account');

const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    account_id: DataTypes.INTEGER
  });

  Employee.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = Employee;