const express = require('express')
const router = express.Router()

// List of Branch Manager Services
router.get('/', (req, res) => {
    res.render('branch/index') 
})

// Agent register Form
router.get('/agentRegister', (req, res) => {
    res.render('branch/agentRegister') 
})

// Report
router.get('/report', (req, res) => {
    res.render('branch/report') 
})

module.exports = router