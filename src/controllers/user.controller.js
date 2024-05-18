const UserService = require('../services/user.service');
const { body, validationResult } = require('express-validator');

exports.userValidationRules = () => [
    body('firstName').trim().escape(),
    body('lastName').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone('any').optional({ checkFalsy: true }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('userType').trim().escape().isIn(['SELLER', 'BUYER']).withMessage('User type must be either buyer or seller'),
];

exports.loginValidationRules = () => [
    body('email').isEmail().withMessage('Must be a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            userType: req.body.userType
        };

        const user = await UserService.register(userData);
        if (user) {
            user.password = undefined;
        }
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

