const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/property.controller');
const authenticateToken = require('../middlewares/authenticate.token.middleware');

router.get('/', authenticateToken, PropertyController.getProperties)
router.post('/', PropertyController.propertyValidationRules(), authenticateToken, PropertyController.createProperty);

module.exports = router;
