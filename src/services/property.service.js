const Property = require('../models/property.model');

exports.createProperty = async (propertyData, userId) => {
    const property = new Property({ ...propertyData, sellerId: userId });
    return property.save();
};
