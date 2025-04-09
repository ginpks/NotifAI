const express = require('express');

const router = express.Router();

//  new router object to hold routes related to users.
const { getAllUsers } = require('../controllers/userController');
const{loginUser}=require('../controllers/loginUserController');
const {logoutUser} = require('../controllers/logoutUserController'); // Import the logout controller
const authMiddleware = require('../middleware/authMiddleware');
const { meUser } = require('../controllers/meUserController'); // Import the meUserController
const { getUserProfile } = require('../controllers/profileUserController');
const { createNotificationController, getUserNotifications } = require('../controllers/notifController');

const { signupUserController } = require('../controllers/signupUserController');

// POST /users/signup -> handle user sign-up
router.post('/signup', signupUserController);
//get all users
router.get('/', authMiddleware, getAllUsers,createNotificationController); // auth middleware executed before getAllUsers
//login logic from user
router.post('/login', loginUser);
//logou logic from user
router.post('/logout', logoutUser); // Add the logout route
//get current user
router.get('/me', authMiddleware, meUser); 
router.post('/', authMiddleware, createNotificationController);
// Get Current User Profile
router.get('/profile', getUserProfile);
router.get('/:username',getUserNotifications);

module.exports = router;
