const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/property.controller');

router.post('/properties', PropertyController.createProperty);

module.exports = router;
