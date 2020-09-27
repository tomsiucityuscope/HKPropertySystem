const express = require('express')
const router = express.Router()

// service list page 
router.get('/', (req, res) => {
    res.render('services/index') 
})

// service: selling property page
router.get('/sellingProperty', (req, res) => {
    res.render('services/sellingPage') 
})

// service: renting property page
router.get('/rentingProperty', (req, res) => {
    res.render('services/rentingPage') 
})

// service: agent list page
router.get('/agentList', (req, res) => {
    res.render('services/agentList') 
})

// service: property information page
router.get('/propertyInformation', (req, res) => {
    res.render('services/propertyInfo') 
})

// service: registry branch page
router.get('/branchRegister', (req, res) => {
    res.render('services/branchRegister') 
})

module.exports = router
