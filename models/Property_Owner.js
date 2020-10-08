const mongoose = require('mongoose')

const property_ownerSchema = new mongoose.Schema({
    Owner_ID: {
        type: String,
        unique: true,
        required: true
    },
    LName_Agent: {
        type: String,
        require: true
    },
    FName_Agent: {
        type: String,
        require: true
    },
    Phone_Agent: { 
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Property_Owner', property_ownerSchema, 'Property_Owner')