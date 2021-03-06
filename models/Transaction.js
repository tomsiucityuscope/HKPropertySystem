const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    Transaction_Ref: {
        type: String,
        unique: true,
        required: true
    },
    Transaction_Type: {
        type: String,
        require: true
    },
    Transaction_Price: {
        type: Number,
        require: true
    },
    Transaction_Date: {
        type: Date,
        require: true
    },
    Property_ID: {
        type: String,
        require: true
    },
    Owner_ID: {
        type: String,
        require: true
    },
    Customer_ID: {
        type: String,
        require: true
    },
    Agent_ID: {
        type: String,
        require: true
    },
    Commission: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema, 'Transaction')