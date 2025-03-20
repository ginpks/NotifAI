/* 
this file is responsible for launching our express server 
and mounting our router to the server to direct 
the HTTP requests to the API endpoints in the routes directory 
*/

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { createUser: createUserController } = require('./controllers/userController'); // importing for mock post request
const sequelize = require('./db/db');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/hello-world-demo', (req, res) => {
    console.log("/hello-world-demo get request received");
    res.send({ text: 'Hello from the backend123!' });
});


app.use('/users', userRoutes);

const createHardcodedUser = async () => {
    try {

        const existingUser = await User.findOne({ where: { username: 'john_doe', email: 'hello@gmail.com'} });
        if (!existingUser){
            const mockRequest = {
                body: {
                    username: 'john_doe',
                    email: 'hello@gmail.com',
                    password: '1234567',
                },
            };
                await createUserController(mockRequest);
                console.log("Mock post request for creating user sent successfully from server.js wahoo!")
            } else {
                console.log('User already exists in the database womp womp.');
            }
    } catch (error) {
        console.error('Error hardcoding user:', error);
    }
};
const viewUsers = async () => {
    try {
        const users = await User.findAll();
        console.log("📌 Current Users in Database:", JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


const startServer = async () => {
    await sequelize.sync({ force: true });
    await createHardcodedUser();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    await viewUsers();
};



startServer();

