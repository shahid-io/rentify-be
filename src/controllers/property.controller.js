const PropertyService = require('../services/property.service');


exports.getProperties = async (req, res) => {
    const properties = await PropertyService.getProperties();
    res.status(201).json(properties);
}

exports.createProperty = async (req, res) => {
    try {
        const property = await PropertyService.createProperty(req.body, req.user.id);
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
