const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    Property_ID: {
        type: String,
        unique: true,
        required: true
    },
    Owner_ID: {
        type: String,
        require: true
    },
    District: {
        type: String,
        require: true
    },
    Estate: { 
        type: String,
        require: true
    },
    Block_Num: {
        type: Number,
        require: true
    },
    Floor_Num: {
        type: Number,
        require: true
    },
    GrossFloorArea: {
        type: Number,
        require: true
    },
    NumOfBedroom: {
        type: Number,
        require: true
    },
    CarPark_Provided: {
        type: Boolean,
        require: true
    },
    Selling_Price: {
        type: Number,
        require: true
    },
    Rental_Price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Property', propertySchema, 'Property')