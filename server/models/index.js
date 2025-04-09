const Notification = require('./notificationModel');
const NewsNotification = require('./newsModel');
const ClaimNotification = require('./claimModel');
const PolicyNotification = require('./policyModel');
const NotificationRecipient = require('./notificationRecipientModel');
const User = require('./userModel');

// Associations
Notification.hasOne(NewsNotification, { foreignKey: 'notificationid' });
Notification.hasOne(ClaimNotification, { foreignKey: 'notificationid' });
Notification.hasOne(PolicyNotification, { foreignKey: 'notificationid' });
Notification.hasMany(NotificationRecipient, { foreignKey: 'notificationid' });

NewsNotification.belongsTo(Notification, { foreignKey: 'notificationid' });
ClaimNotification.belongsTo(Notification, { foreignKey: 'notificationid' });
PolicyNotification.belongsTo(Notification, { foreignKey: 'notificationid' });

NotificationRecipient.belongsTo(Notification, { foreignKey: 'notificationid' });
NotificationRecipient.belongsTo(User, { foreignKey: 'recipientid' });

module.exports = {
  Notification,
  NewsNotification,
  ClaimNotification,
  PolicyNotification,
  NotificationRecipient,
  User
};
