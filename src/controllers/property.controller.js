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

exports.createProperty = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const propertyData = {
            place: req.body.place,
            area: req.body.area,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            nearbyHospitals: req.body.nearbyHospitals,
            nearbyColleges: req.body.nearbyColleges,
            sellerId: userId
        };

        const property = await PropertyService.createProperty(propertyData, userId);
        res.status(201).json(property);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: error.message });
    }
};
