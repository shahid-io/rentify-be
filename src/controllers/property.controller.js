const PropertyService = require('../services/property.service');
const { body, validationResult } = require('express-validator');

exports.propertyValidationRules = () => [
    body('place').trim().escape(),
    body('area').isNumeric().withMessage('Area must be a number'),
    body('bedrooms').isInt().withMessage('Bedrooms must be an integer'),
    body('bathrooms').isInt().withMessage('Bathrooms must be an integer'),
    body('nearbyHospitals').optional().trim().escape(),
    body('nearbyColleges').optional().trim().escape(),
];


exports.getProperties = async (req, res) => {
    const properties = await PropertyService.getProperties();
    res.status(201).json(properties);
}

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await PropertyService.getAllProperties();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createProperty = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const userId = req.user.userId;
        const propertyData = {
            sellerId: userId,
            place: req.body.place,
            area: req.body.area,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            nearbyHospitals: req.body.nearbyHospitals,
            nearbyColleges: req.body.nearbyColleges,

        };

        const property = await PropertyService.createProperty(propertyData, userId);
        res.status(201).json(property);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.getPropertiesBySeller = async (req, res) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await PropertyService.getPropertiesBySeller(userId, page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateProperty = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const propertyId = req.params.id;
    const userId = req.user.id;

    try {
        const updatedProperty = await PropertyService.updateProperty(propertyId, userId, req.body);
        res.json(updatedProperty);
    } catch (error) {
        if (error.message === 'Property not found or not authorized') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProperty = async (req, res) => {
    const propertyId = req.params.id;
    const userId = req.user.id;

    try {
        await PropertyService.deleteProperty(propertyId, userId);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Property not found or not authorized') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

