
const { DataTypes } = require('sequelize');
const { 
    Notification, 
    NotificationRecipient, 
    PolicyNotification, 
    NewsNotification, 
    ClaimNotification 
  } = require('../models'); // centralized import
  

const createNotificationController=async (req, res) => {
    try {
        const { id, userid, type, title, body, recipients, subtype } = req.body; 
        // Check if the user already exists by email (or username, if you prefer)
        const existingNotif = await Notification.findOne({ where: { id } });
        if (existingNotif) {
        return res.status(400).json({ message: 'A notification with this ID already exists.' });
        }
        const newNotif = await Notification.create({ 
            id, 
            userid, 
            type, 
            title, 
            body, 
            isread: false, 
            isarchived: false, 
            datecreated: new Date(), 
            subtype,
        }); 
        const notifType = type.toLowerCase();
        console.log("Notification created and stored via createNotification wahoo!")
        if (notifType=="policy"){
            await PolicyNotification.create({
                notificationid: newNotif.id,
                policyid: subtype.policyid,
                description: body||subtype.description,
                changes_to_premium: subtype.changes_to_premium,
                billing_reminder_date: subtype.billing_reminder_date,
              });
        }
        if (notifType=="news"){
            await NewsNotification.create({
                notificationid: newNotif.id,
                expiration_date:subtype.expiration_date||null,
                details: body||subtype.body,
                type: subtype.type || null,
              });
        
        }
        if(notifType=="claim"){
            await ClaimNotification.create({
                notificationid: newNotif.id,
                insured_name:subtype.insured_name||null,
                claimant_name:subtype.claimant_name||null,
                tasktype: subtype.tasktype||null,
                duedate: subtype.duedate|| null,
                lineofbusiness:subtype.lineofbusiness||null,
                description: body||subtype.description,
                priority: subtype.priority||'high',
                iscompleted: subtype.iscompleted||false,

            });
        }
        console.log("The subtype of the notfication is added to the subtable", notifType)
        console.log("notification_id", newNotif.id);

        //in order to send bulk notifications recepient should be a list of receipients (even if it is just one)
        const recipientInsert= recipients.map((recipient_id) => ({
            notificationid: newNotif.id,
            recipientid:recipient_id,
            is_read: false,
            date_sent: new Date(),
        }));
        await NotificationRecipient.bulkCreate(recipientInsert);
        console.log("notification recepient model updates")
        return res.status(201).json({ message: 'Notification created successfully', notification: newNotif });
    }
    catch (error) {
        console.error('Error creating notification:', error.message);
        return res.status(500).json({ error: 'Failed to create notification' });

    }
};
// Get User Notifications
const getUserNotifications = async (req, res) => {
    try {
      const username = req.params.username;
  
      const notifications = await Notification.findAll({
        include: [
          {
            model: NotificationRecipient,
            where: { recipientid: username },
            required: true,
          },
          {
            model: PolicyNotification,
            required: false,
          },
          {
            model: NewsNotification,
            required: false,
          },
          {
            model: ClaimNotification,
            required: false,
          }
        ],
        order: [['datecreated', 'DESC']],
      });
  
      return res.status(200).json({ notifications });
    } catch (error) {
      console.error('Error fetching user notifications:', error.message);
      return res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  };
module.exports={
    createNotificationController,
    getUserNotifications,
};
