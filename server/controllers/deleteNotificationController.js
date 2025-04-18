const Notification = require("../models/notificationModel");
const NotificationRecipient = require("../models/notificationRecipientModel");
const NewsNotification = require("../models/newsModel");
const ClaimNotification = require("../models/claimModel");
const PolicyNotification = require("../models/policyModel");

const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(
      "delete request received for /notifications (deleting notification by notification id), id is " +
        id
    );

    let notification = await Notification.findOne({
      where: { id: id },
    });

    await notification.destroy();
    console.log("Deleted notification with id " + id);

    // Delete associated entries in NotificationRecipient, Claims, Policy, and News
    await NotificationRecipient.destroy({ where: { notificationId: id } });
    await ClaimNotification.destroy({ where: { notificationId: id } });
    await PolicyNotification.destroy({ where: { notificationId: id } });
    await NewsNotification.destroy({ where: { notificationId: id } });

    return res
      .status(200)
      .json({ message: "Notification deleted successfully." });
  } catch (error) {
    console.error("Error deleting notifications:", error.message);
    return res.status(500).json({ error: "Failed to delete notifications." });
  }
};

module.exports = deleteNotification;
