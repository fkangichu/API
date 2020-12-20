const mongoose = require('mongoose')

const customer = new mongoose.Schema({
    customer_id: {type: String, required: true, immutable: true},
    phone_number: {type: String, required: true, unique: true},
    email_address:{type: String, unique: true},
    first_name: String,
    middle_name: String,
    other_names: [],
    country: String,
    city: String,
    date_of_birth: Date,
    age: Number,
    gender: String,
    level_of_education: String,
    home_address: String,
    IMEI: String,
    verified: {type: Boolean, default: false},
    last_login: Date,
    active: Boolean,
    photos:[],
    last_location: String

}, {
	strict: false,
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('Customer', customer)