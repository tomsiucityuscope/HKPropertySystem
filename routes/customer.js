const express = require('express')
const router = express.Router()

// List of Customer Services
router.get('/', (req, res) => {
    res.render('customer/index') 
})

// Related Transaction Form
router.get('/transaction', (req, res) => {
    res.render('customer/transaction') 
})

module.exports = router