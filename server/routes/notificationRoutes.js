/**
 * Team Data Baes
 * 4/5/2025
 *
 * Defines routes for notifications
 *
 */

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getNotifications,
} = require("../controllers/getNotificationsController");
const { getNotification } = require("../controllers/getNotificationController");
const {
  createNotification,
} = require("../controllers/createNotificationController");
const deleteNotification = require("../controllers/deleteNotificationController");

const router = express.Router();

router.post("/", authMiddleware, getNotifications); // auth middleware executed before getNotifications- note this gets all notifications by filter/sort
router.get("/:id", authMiddleware, getNotification); // auth middleware executed before getNotification- note getNotification gets 1 notification by id
router.delete("/:id", authMiddleware, deleteNotification); // auth middleware executed before getNotification- note getNotification gets 1 notification by id
router.post("/create", authMiddleware, createNotification); // auth middleware executed before createNotification

module.exports = router;
