require('dotenv').
    dotenv.config();

const config = require('config');
module.exports = {
    mongoURI: process.env.MONGO_URI || config.get('mongoURI'),
    jwtSecret: process.env.JWT_SECRET || config.get('jwtSecret')
};
