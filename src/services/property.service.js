const Property = require('../models/property.model');

exports.getProperties = async () => {
    const properties = await Property.find().exec();
    return properties;
}

exports.createProperty = async (propertyData, userId) => {
    const property = new Property({ ...propertyData, sellerId: userId });
    return property.save();
};
