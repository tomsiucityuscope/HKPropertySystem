const express = require('express')
const router = express.Router()
const Branch = require('../models/Branch')

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
    res.render('services/branchRegister', { branch: new Branch() }) 
})

// Create Branch
router.post('/', async (req, res) => {
    const branch = new Branch({
        Branch_ID: req.body.Branch_ID,
        LName_Manager: req.body.LName_Manager,
        FName_Manager: req.body.FName_Manager,
        BranchName: req.body.BranchName,
        Address: req.body.Address
    })
    try {
        const newbranch = await branch.save()
        res.redirect('/services')
    } catch {
        res.render('services/branchRegister', {
            branch: branch,
            errorMessage:  'Error creating Branch'
        })
    } 
})

module.exports = router
