const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    return user.save();
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid credentials');
    }
    return user; // Further enhance with JWT or sessions
};
