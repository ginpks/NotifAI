const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const ClaimNotification = sequelize.define(
  'ClaimNotification',
  {
    notificationid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'notifications', key: 'id' },
    },
    insuredname: DataTypes.STRING,
    claimantname: DataTypes.STRING,
    tasktype: DataTypes.STRING,
    duedate: DataTypes.DATE,
    lineofbusiness: DataTypes.STRING,
    priority: DataTypes.STRING,
    iscompleted: DataTypes.BOOLEAN,
  },
  {
    tableName: 'claimnotifications',
    timestamps: false,
  }
);

module.exports = ClaimNotification;




