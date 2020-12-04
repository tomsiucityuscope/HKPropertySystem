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
const { UserType } = require('../config/auth')
const accessAuth = require('../function_js/accessAuth')

// Selling Property Page - Normal User & Customer & Owner & Admin === Done
router.get('/sellingProperty', accessAuth.CanViewSellingPage, async (req, res) => {
    console.log('Go to Selling Property Page')
    const sellingproperty = await Property.find({}).where('Selling_Price').gt(0)
    const estatename = await Property.distinct('Estate').where('Selling_Price').gt(0)
    res.render('services/sellingPage', {
        login_User_ID: UserType(req, res),
        sellingPropertylist: sellingproperty,
        estatelist: estatename,
        EstateName: ""
    })
})

router.post('/sellingProperty', accessAuth.CanViewSellingPage, async (req, res) => {
    console.log('Start to view list of Selling property ...')
    const { EstateName } = req.body
    const estatename = await Property.distinct('Estate').where('Selling_Price').gt(0)
    var sellingproperty = await Property.find({}).where('Selling_Price').gt(0)
    if (EstateName) {
        sellingproperty = await Property.find({}).where('Selling_Price').gt(0).where('Estate').equals(EstateName)
    }  
    res.render('services/sellingPage', {
        login_User_ID: UserType(req, res),
        sellingPropertylist: sellingproperty,
        estatelist: estatename,
        EstateName: EstateName
    })
})

// Renting Property Page - Normal User & Customer & Owner & Admin === Done
router.get('/rentingProperty', accessAuth.CanViewRentingPage, async (req, res) => {
    console.log('Go to Renting Property Page')
    const rentingproperty = await Property.find({}).where('Rental_Price').gt(0)
    const estatename = await Property.distinct('Estate').where('Rental_Price').gt(0)
    res.render('services/rentingPage', {
        login_User_ID: UserType(req, res),
        rentingPropertylist: rentingproperty,
        estatelist: estatename,
        EstateName: ""
    })
})

router.post('/rentingProperty', accessAuth.CanViewRentingPage, async (req, res) => {
    console.log('Start to view list of Renting property ...')
    const { EstateName } = req.body
    const estatename = await Property.distinct('Estate').where('Rental_Price').gt(0)
    var rentingproperty = await Property.find({}).where('Rental_Price').gt(0)
    if (EstateName) {
        rentingproperty = await Property.find({}).where('Rental_Price').gt(0).where('Estate').equals(EstateName)
    }
    res.render('services/rentingPage', {
        login_User_ID: UserType(req, res),
        rentingPropertylist: rentingproperty,
        estatelist: estatename,
        EstateName: EstateName
    })
})

// Property List Page - Admin & Agent & Branch === Done
router.get('/searchProperty', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Go to View Property Page')
    const propertylist = await Property.find({})
    const estatename = await Property.distinct('Estate')
    res.render('services/propertyInfo', {
        login_User_ID: UserType(req, res),
        propertylist: propertylist,
        estatelist: estatename,
        EstateName: ""
    })
})

router.post('/searchProperty', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Start to view list of Property ...')
    const { EstateName } = req.body
    const estatename = await Property.distinct('Estate')
    var propertylist = await Property.find({})
    if (EstateName) {
        propertylist = await Property.find({}).where('Estate').equals(EstateName)
    }  
    res.render('services/propertyInfo', {
        login_User_ID: UserType(req, res),
        propertylist: propertylist,
        estatelist: estatename,
        EstateName: EstateName
    })
})

// Transaction - Admin & Agent & Branch === Done
router.get('/searchTransaction', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Go to View Transaction Page')
    const branchlist = await Branch.find({})
    const agentlist = await Agent.find({})
    const transactionlist = Transaction.find({})
    res.render('services/transactionInfo', {
        login_User_ID: UserType(req, res),
        branchlist: branchlist,
        Branch_ID: '',
        Transaction_Type: '',
        transactionList: []
    })
})

router.post('/searchTransaction', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Start to View Transaction List ...')
    const { Branch_ID, Transaction_Type } = req.body
    const branchlist = await Branch.find({})
    var transactionList = []
    var allcollection = []
    const agentlist = await Agent.find({Branch_ID: Branch_ID}).select('Agent_ID')
    for (i = 0; i < agentlist.length; i++) {
        var tempItem = await Transaction.find({Agent_ID: agentlist[i].Agent_ID}).where('Transaction_Type').equals(Transaction_Type)
        if (tempItem.length > 0) {
            allcollection.push(tempItem)
        }
    }
    allcollection.forEach(byAgent => {
        byAgent.forEach(transaction => {
            var viewItem = {}
            viewItem.Transaction_Ref = transaction.Transaction_Ref
            viewItem.Transaction_Type = transaction.Transaction_Type
            viewItem.Transaction_Price = transaction.Transaction_Price
            viewItem.Transaction_Date = transaction.Transaction_Date
            viewItem.Property_ID = transaction.Property_ID
            viewItem.Owner_ID = transaction.Owner_ID
            viewItem.Customer_ID = transaction.Customer_ID
            viewItem.Agent_ID = transaction.Agent_ID
            viewItem.Commission = transaction.Commission
            transactionList.push(viewItem)
        })
    })
    res.render('services/transactionInfo', {
        login_User_ID: UserType(req, res),
        branchlist: branchlist,
        Branch_ID: Branch_ID,
        Transaction_Type: Transaction_Type,
        transactionList: transactionList
    })
})

// Owner Property - Owner
router.get('/ownerProperty', async (req, res) => {
    console.log('Go to Owner Property Page')
    res.render('services/ownerProperty', {
        login_User_ID: UserType(req, res)
    })
})

// Agent (View) - Admin & Agent & Branch
router.get('searchAgent', async (req, res) => {
    console.log('Go to View Agent Page')
    res.render('services/agentInfo', {
        login_User_ID: UserType(req, res)
    })
})

// Customer (View) - Admin & Agent & Branch
router.get('searchCustomer', async (req, res) => {
    console.log('Go to View Customer Page')
    res.render('services/customerInfo', {
        login_User_ID: UserType(req, res)
    })
})

// Property Owner Page by Property -  Admin & Agent & Branch === Done
router.get('/searchOwner', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Go to Search Owner Page')
    const propertylist = await Property.find({})
    res.render('services/ownerInfo', {
        login_User_ID: UserType(req, res),
        propertylist: propertylist,
        propertyInfo: null,
        ownerInfo: null,
        Property_ID: ''
    })
})

router.post('/searchOwner', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Start to view Information of Property Owner for specific property ...')
    const { Property_ID } = req.body
    const propertylist = await Property.find({})
    var property = null
    var owner = null
    if (Property_ID) {
        property = await Property.findOne({Property_ID: Property_ID})
        owner = await Owner.findOne({Owner_ID: property.Owner_ID})
    }
    res.render('services/ownerInfo', {
        login_User_ID: UserType(req, res),
        propertylist: propertylist,
        propertyInfo: property,
        ownerInfo: owner,
        Property_ID: Property_ID
    })
})

// Branch (View) - Admin
router.get('/serachBranch', async (req, res) => {
    console.log('Go to View Branch Page')
    res.render('services/branchInfo', {
        login_User_ID: UserType(req, res)
    })
})

// Agent List Page - All User === Done
router.get('/agentList', async (req, res) => {
    console.log('Go to View Agent Page')
    const agentlist = await Agent.find({})
    const branchlist = await Branch.find({})
    var agentList = []
    agentlist.forEach(agent => {
        var tempbranch = branchlist.find(branch => { return branch.Branch_ID == agent.Branch_ID })
        var viewItem = {}
        viewItem.Agent_ID = agent.Agent_ID
        viewItem.AgentName = agent.LName_Agent + " " + agent.FName_Agent
        viewItem.Phone_Agent = agent.Phone_Agent
        viewItem.BranchName = tempbranch.BranchName
        agentList.push(viewItem)
    })
    res.render('services/agentPage', {
        login_User_ID: UserType(req, res),
        agentList: agentList
    })
})

// Recommended List for Selling - Admin & Agent & Branch === Done
router.get('/recommendedSellingProperty', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Go to Recommended Selling Property Page')
    const customerlist = await Customer.find({}).where('Buying_Budget').gt(0)
    res.render('services/recomSellingProperty', {
        login_User_ID: UserType(req, res),
        customerlist: customerlist,
        recommendedlist: null,
        Customer_ID: "",
        recordCount: null
    })
})

router.post('/recommendedSellingProperty', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Start to view list of Recommended Selling property for specific customer ...')
    const { Customer_ID } = req.body
    const customerlist = await Customer.find({}).where('Buying_Budget').gt(0)
    var customer = await Customer.findOne({Customer_ID: Customer_ID})
    var recommendedlist = null
    var recordCount = null
    if (Customer_ID) {
        recommendedlist = await Property.find({}).where('District').equals(customer.Perferred_District).where('Estate').equals(customer.Perferred_Estate).where('Selling_Price').lte(customer.Buying_Budget);
        recordCount = recommendedlist.length
    }
    res.render('services/recomSellingProperty', {
        login_User_ID: UserType(req, res),
        customerlist: customerlist,
        recommendedlist: recommendedlist,
        Customer_ID: Customer_ID,
        recordCount: recordCount
    })
})

// Recommended List for Renting - Admin & Agent & Branch === Done
router.get('/recommendedRentingProperty', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Go to Recommended Renting Property Page')
    const customerlist = await Customer.find({}).where('Rental_Budget').gt(0)
    res.render('services/recomRentingProperty', {
        login_User_ID: UserType(req, res),
        customerlist: customerlist,
        recommendedlist: null,
        Customer_ID: "",
        recordCount: null
    })
})

router.post('/recommendedRentingProperty', accessAuth.CanViewPropertyPage, async (req, res) => {
    console.log('Start to view list of Recommended Renting property for specific customer ...')
    const { Customer_ID } = req.body
    const customerlist = await Customer.find({}).where('Rental_Budget').gt(0)
    var customer = await Customer.findOne({Customer_ID: Customer_ID})
    var recommendedlist = null
    var recordCount
    if (Customer_ID) {
        recommendedlist = await Property.find({}).where('District').equals(customer.Perferred_District).where('Estate').equals(customer.Perferred_Estate).where('Rental_Price').lte(customer.Rental_Budget);
        recordCount = recommendedlist.length
    }
    res.render('services/recomRentingProperty', {
        login_User_ID: UserType(req, res),
        customerlist: customerlist,
        recommendedlist: recommendedlist,
        Customer_ID: Customer_ID,
        recordCount: recordCount
    })
})

module.exports = router
