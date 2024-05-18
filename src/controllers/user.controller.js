const UserService = require('../services/user.service');

exports.register = async (req, res) => {
    try {
        const user = await UserService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { user, token } = await UserService.login(req.body);
        res.json({
            message: 'Login successful',
            token,
            userId: user._id,
            email: user.email
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

