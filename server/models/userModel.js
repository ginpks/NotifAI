const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer',
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

// // Import Notification and NotificationRecipient AFTER User is defined (prevents circular dependency)
// const Notification = require('./notificationModel');
// const NotificationRecipient = require('./notificationRecipientModel');


// User.belongsToMany(Notification, {
//   through: NotificationRecipient,
//   foreignKey: 'recipientid',
//   otherKey: 'notificationid',
// });

module.exports = User;





