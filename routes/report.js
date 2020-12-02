const express = require('express')
const router = express.Router()

// load models
const Agent = require('../models/Agent')
const Branch = require('../models/Branch')
const Customer = require('../models/Customer')
const Property = require('../models/Property')
const Owner = require('../models/Property_Owner')
const Transaction = require('../models/Transaction')
const UserProfile = require('../models/UserProfile')

// Transaction Report - Admin & Branch
router.get('/generateReport', async (req, res) => {
    console.log('Go to Generate Report Page')
    res.render('reports/monthlyReport')
})

module.exports = router