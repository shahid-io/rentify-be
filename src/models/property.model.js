const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    nearbyHospitals: String,
    nearbyColleges: String
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
