const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema({
    Agent_ID: {
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
    },
    Branch_ID: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Agent', agentSchema, 'Agent')