const Property = require('../models/Property');

exports.createProperty = async (propertyData, userId) => {
    const property = new Property({ ...propertyData, sellerId: userId });
    return property.save();
};
