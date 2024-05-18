const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    userType: {
        type: String,
        enum: ['SELLER', 'BUYER', 'BOTH'],
        default: 'BUYER'
    },
    status: { type: Number, default: 1 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
