const Property = require('../models/property.model');
const { getPagination } = require('../utils/helper');


exports.getAllProperties = async (page = 1, limit = 10) => {
    const { skip, limit: pageSize } = getPagination(page, limit);
    const properties = await Property.find({}).populate('sellerId', 'firstName lastName email')
        .skip(skip)
        .limit(pageSize);
    const total = await Property.countDocuments();
    return {
        properties,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        totalProperties: total
    };

}

exports.createProperty = async (propertyData, userId) => {
    const property = new Property({ ...propertyData, sellerId: userId });
    return property.save();
};

exports.getPropertiesBySeller = async (userId, page = 1, limit = 10) => {
    const { skip, limit: pageSize } = getPagination(page, limit);

    const properties = await Property.find({ sellerId: userId })
        .skip(skip)
        .limit(pageSize);
    const total = await Property.countDocuments({ sellerId: userId });

    return {
        properties,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        totalProperties: total
    };
};

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