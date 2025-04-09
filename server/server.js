/*
this file is responsible for launching our express server
and mounting our router to the server to direct
the HTTP requests to the API endpoints in the routes directory
*/

//notification models access
const {
  Notification,
  NotificationRecipient,
  NewsNotification,
  PolicyNotification,
  ClaimNotification,
  User,
} = require('./models');
//notification model access end

const express = require('express');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const userRoutes = require('./routes/userRoutes');
const {
  createUser: createUserController,
} = require('./controllers/userController'); // importing for mock post request

const {
  createNotificationController,
  getUserNotifications
} = require('./controllers/notifController'); // importing for mock post request
 
const sequelize = require('./db/db');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:9500', // Allow requests from your React app
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());

// Configure express-session middleware
app.use(
  session({
    secret: 'your_secret_key', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Make the cookie only accessible via HTTP(S)
      secure: false, // Set to true in production (when using HTTPS)
      sameSite: 'Strict', // Prevent CSRF attacks
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires after 1 day
    },
  })
);

const port = 3000;

app.get('/hello-world-demo', (req, res) => {
  console.log('/hello-world-demo get request received');
  res.send({ text: 'Hello from the backend123!' });
});

app.use('/users', userRoutes);
//test function
const createHardcodedUser = async () => {
  try {
    const existingUser = await User.findOne({
      where: {
        fname: 'John',
        lname: 'Doe',
        username: 'john_doe',
        email: 'hello@gmail.com',
        role: 'customer',
      },
    });
    if (!existingUser) {
      const mockRequest = {
        body: {
          fname: 'John',
          lname: 'Doe',
          username: 'john_doe',
          email: 'test@gmail.com',
          password: '123',
          role: 'customer',
        },
      };
      await createUserController(mockRequest);
      console.log(
        'Mock post request for creating user sent successfully from server.js wahoo!'
      );
    } else {
      console.log('User already exists in the database womp womp.');
    }
  } catch (error) {
    console.error('Error hardcoding user:', error);
  }
};
//test function for user interaction in notfications database
const createHardcodedUser2 = async () => {
  try {
    const existingUser2 = await User.findOne({
      where: {
        fname: 'Tracy',
        lname: 'Collins',
        username: 'tracy_collins',
        email: 'tcollins@gmail.com',
        role: 'employee',
      },
    });
    if (!existingUser2) {
      const mockRequest = {
        body: {
          fname: 'Tracy',
          lname: 'Collins',
          username: 'tracy_collins',
          email: 'tcollins@gmail.com',
          password:'456',
          role: 'employee',
        },
      };
      await createUserController(mockRequest);
      console.log(
        'Mock post request for creating user2 sent successfully from server.js wahoo!'
      );
    } else {
      console.log('User2 already exists in the database womp womp.');
    }
  } catch (error) {
    console.error('Error hardcoding user2:', error);
  }
};


const createHardcodedNotification=async()=>{
  try{
    const notif1= await Notification.findOne({
      where:{
        id: 23456,
      }
    });
    if(!notif1){
      const mockRequest={
        body:{
          id: 23456,
          userid: 'john_doe', // could be any user creating the notif
          type: 'policy',
          title: 'Premium Update',
          body: 'There is an update to your insurance premium.',
          isread: false,
          isarchived: false,
          datecreated: new Date(),
          subtype: {
            policyid: 1234, // Example subtype for a policy notification
            details: 'Updated premium amount and due date.',
          },
          recipients: ['tracy_collins'],
        }
      };
      const mockResponse = {
        status: (code) => ({
            json: (data) => console.log(JSON.stringify(data, null, 2)),
        })
    };
    await createNotificationController(mockRequest, mockResponse);
    console.log('Mock post request for creating notification sent successfully from server.js wahoo!'); 
  }
  else{
    console.log('Notification already exists in the database womp womp.');
  }
}
catch (error) {
  console.error('Error hardcoding notfication:', error);
}
};

const viewUsers = async () => {
  try {
    const users = await User.findAll();
    console.log('📌 Current Users in Database:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    await createHardcodedUser();
    await createHardcodedUser2();
    console.log("\n\n");
    await createHardcodedNotification();
    const mockRequest = {
      params: { username: 'tracy_collins' }, // Replace 'john_doe' with the desired user ID
    };
    const mockResponse = {
      status: (code) => ({
        json: (data) => console.log("Accessing notfications from john_doe to tracy_collins",JSON.stringify(data, null, 2)),
      }),
    };

    await getUserNotifications(mockRequest, mockResponse);

    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    await viewUsers();
    // await view();
  } catch (error) {
    console.error('Error during server startup:', error);
  }
};

startServer();

