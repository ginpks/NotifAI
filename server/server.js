/*
    Data Baes
    2/28/2025

    Entry point of backend server. Establishes API endpoints, [fill in more here]
*/


const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { createUser } = require('./models/userModel'); // Import createUser from userModel.js
require('dotenv').config({ path: '../' });

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/hello-world-demo', (req, res) => {
    console.log("/hello-world-demo get request received");
    res.send({ text: 'Hello from the backend123!' });
});


app.use('/users', userRoutes);

//Mockpostrequest to store a user in the database
const mockPostRequest = async () => {
    try {
        const newUser = await createUser("hardcodedUser3", "hardcoded3@example.com");
        console.log('Response data:', newUser);
    } catch (error) {
        console.error('Error hardcoding user:', error);
    }
};
mockPostRequest(); //Call the mockPostRequest function

const debugMode = (process.env.DEBUG_MODE != 1) ? (0) : (1);    // checks for env variable

app.listen(port, () => {
    console.log(`Server is running on port ${port}, debug mode is ${debugMode}`);
});





