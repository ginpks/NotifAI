const express = require('express');

const router = express.Router();

//  new router object to hold routes related to users.
const { createUser, getAllUsers } = require('../controllers/userController');
const{loginUser}=require('../controllers/loginUserController')

//create a user
router.post('/', createUser);
//get all users
router.get('/', getAllUsers);
//login logic from user
router.post('/login', loginUser);

module.exports = router;