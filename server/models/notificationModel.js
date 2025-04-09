const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Notification = sequelize.define(
  'Notification',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'users', key: 'username' }, // linking the sender
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isread: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isarchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    datecreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'notifications',
    timestamps: false,
  }
);

// // Import the child models AFTER the Notification model is defined (prevents circular depedency)
// const NewsNotification = require('./newsModel');
// const ClaimNotification = require('./claimModel');
// const PolicyNotification = require('./policyModel');

// // Define relationships here
// Notification.hasOne(NewsNotification, { foreignKey: 'notificationid' });
// Notification.hasOne(ClaimNotification, { foreignKey: 'notificationid' });
// Notification.hasOne(PolicyNotification, { foreignKey: 'notificationid' });

// // Define the belongsTo relationships AFTER the child models are imported (prevents circular dependecy)
// NewsNotification.belongsTo(Notification, { foreignKey: 'notificationid' });
// ClaimNotification.belongsTo(Notification, { foreignKey: 'notificationid' });
// PolicyNotification.belongsTo(Notification, { foreignKey: 'notificationid' });

module.exports = Notification;



