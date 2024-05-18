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
        const user = await UserService.login(req.body);
        const temp = user.toObject();
        delete temp.password; 
        res.json(temp);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
