const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    Customer_ID: {
        type: String,
        unique: true,
        required: true
    },
    LName_Customer: {
        type: String,
        require: true
    },
    FName_Customer: {
        type: String,
        require: true
    },
    Phone_Customer: { 
        type: String,
        require: true
    },
    Perferred_District: {
        type: String,
    },
    Perferred_Estate: {
        type: String,
    },
    Buying_Budget: {
        type: Number
    },
    Rental_Budget: {
        type: Number
    }
})

module.exports = mongoose.model('Customer', customerSchema, 'Customer')