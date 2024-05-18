const Property = require('../models/property.model');

exports.getAllProperties = async () => {
    // const properties = await Property.find({}).populate('sellerId', 'email');
    const properties = await Property.find({}).populate('sellerId', 'firstName lastName email');
    return properties;
}

exports.createProperty = async (propertyData, userId) => {
    const property = new Property({ ...propertyData, sellerId: userId });
    return property.save();
};

exports.getPropertiesBySeller = async (userId) => {
    const properties = await Property.find({ sellerId: userId });
    return properties;
}

exports.updateProperty = async (propertyId, userId, propertyData) => {
    const property = await Property.findOne({ _id: propertyId, sellerId: userId });
    if (!property) {
        throw new Error('Property not found or not authorized');
    }
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData, { new: true });
    return updatedProperty;
};

exports.deleteProperty = async (propertyId, userId) => {

    const property = await Property.findOneAndDelete({ _id: propertyId, sellerId: userId });
    if (!property) {
        throw new Error('Property not found or not authorized');
    }
    return property;
};