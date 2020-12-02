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

// Selling Property Page - Normal User & Customer & Admin
router.get('/sellingProperty', async (req, res) => {
    console.log('Go to Selling Property Page')
    res.render('services/sellingPage')
})

// Renting Property Page - Normal User & Customer & Admin
router.get('/rentingProperty', async (req, res) => {
    console.log('Go to Renting Property Page')
    res.render('services/rentingPage')
})

// Property Page (View) - Normal User & Admin & Agent & Branch & Customer
router.get('/searchProperty', async (req, res) => {
    console.log('Go to View Property Page')
    res.render('services/propertyInfo')
})

// Transaction (View) - Admin & Agent & Branch & Customer & Owner
router.get('/searchTransaction', async (req, res) => {
    console.log('Go to View Transaction Page')
    res.render('services/transactionInfo')
})

// Owner Property - Owner
router.get('/ownerProperty', async (req, res) => {
    console.log('Go to Owner Property Page')
    res.render('services/ownerProperty')
})

// Agent (View) - Normal User & Admin & Branch & Customer & Owner
router.get('/searchAgent', async (req, res) => {
    console.log('Go to View Agent Page')
    res.render('services/agentInfo')
})

// Customer (View) - Admin & Agent & Branch
router.get('searchCustomer', async (req, res) => {
    console.log('Go to View Customer Page')
    res.render('services/customerInfo')
})

// Owner (View) - Admin & Agent & Branch
router.get('/searchOwner', async (req, res) => {
    console.log('Go to View Owner Page')
    res.render('services/ownerInfo')
})

// Branch (View) - Admin
router.get('/serachBranch', async (req, res) => {
    console.log('Go to View Branch Page')
    res.render('services/branchInfo')
})

module.exports = router
