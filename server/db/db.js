const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'users';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '256325';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;

const sequelize = new Sequelize({ 
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: 'postgres',
    password: DB_PASS,
    database: 'users',
    logging: false,
});


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database established wahoo!');
    } catch (error) {
        console.error('Unable to connect to the database womp womp:', error);
    }
}

testConnection();

module.exports = sequelize;