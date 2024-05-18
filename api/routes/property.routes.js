const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/property.controller');
const authenticateToken = require('../middlewares/authenticate.token.middleware');

router.get('/', authenticateToken, PropertyController.getAllProperties)
router.get('/:id', authenticateToken, PropertyController.getPropertiesBySeller)
router.post('/', PropertyController.propertyValidationRules(), authenticateToken, PropertyController.createProperty);
router.put('/:id', PropertyController.propertyValidationRules(), authenticateToken, PropertyController.updateProperty);
router.delete('/', authenticateToken, PropertyController.deleteProperty)

module.exports = router;
