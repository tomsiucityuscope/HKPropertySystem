const mongoose = require('mongoose')

const userprofileSchema = new mongoose.Schema({
    User_ID: {
        type: String,
        unique: true,
        required: true
    },
    User_Type: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('UserProfile', userprofileSchema, 'UserProfile')