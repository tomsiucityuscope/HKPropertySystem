const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    Branch_ID: {
        type: String,
        unique: true,
        required: true
    },
    LName_Manager: {
        type: String,
        require: true
    },
    FName_Manager: {
        type: String,
        require: true
    },
    BranchName: { 
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Branch', branchSchema, 'Branch')