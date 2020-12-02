const mongoose = require('mongoose')

const property_ownerSchema = new mongoose.Schema({
    Owner_ID: {
        type: String,
        unique: true,
        required: true
    },
    LName_Owner: {
        type: String,
        require: true
    },
    FName_Owner: {
        type: String,
        require: true
    },
    Phone_Owner: { 
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Property_Owner', property_ownerSchema, 'Property_Owner')