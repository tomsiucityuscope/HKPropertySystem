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

// Property Page (Create) - Admin & Agent & Branch
router.get('/createProperty', async (req, res) => {
    console.log('Go to Create Property Page')
    res.render('registries/propertyRegistry')
})

// Transaction (Create) - Agent
router.get('/createTransaction', async (req, res) => {
    console.log('Go to Create Transaction Page')
    res.render('registries/transactionRegistry')
})

// Agent (Create) - Admin & Branch
router.get('/createAgent', async (req, res) => {
    console.log('Go to Create Agent Page')
    res.render('registries/agentRegistry')
})

// Customer (Create) - Admin & Agent & Branch
router.get('/createCustomer', async (req, res) => {
    console.log('Go to Create Customer Page')
    res.render('registries/customerRegistry')
})

// Owner (Create) - Admin & Agent & Branch
router.get('/createOwner', async (req, res) => {
    console.log('Go to Create Owner Page')
    res.render('registries/ownerRegistry')
})

// Branch (Create) - Admin
router.get('/createBranch', async (req, res) => {
    console.log('Go to Create Branch Page')
    res.render('registries/branchRegister')
})

module.exports = router