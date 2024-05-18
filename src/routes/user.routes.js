const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.userValidationRules(), UserController.register);
router.post('/login', UserController.loginValidationRules(), UserController.login);

module.exports = router;
