const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define(
  'User', 
  { // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        // allowNull defaults to true
        //email has to be unique different from others
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
}, 
{   // Other model options go here
    tableName: 'users'
});

module.exports = User
