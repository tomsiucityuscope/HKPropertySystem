const express = require('express')
const router = express.Router()

// agent services list
router.get('/', (req, res) => {
    res.render('agent/index') 
})

// Transaction Form
router.get('/transaction', (req, res) => {
    res.render('agent/transaction') 
})

// Register customer Form
router.get('/customerRegister', (req, res) => {
    res.render('agent/customerRegister') 
})

// Register Property Form 
router.get('/propertyRegister', (req, res) => {
    res.render('agent/propertyRegister') 
})

module.exports = router