const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Authenticated } = require('../config/auth')
const calCommission = require('../function_js/calCommission')

// load models
const Agent = require('../models/Agent')
const Branch = require('../models/Branch')
const Customer = require('../models/Customer')
const Property = require('../models/Property')
const Owner = require('../models/Property_Owner')
const Transaction = require('../models/Transaction')
const UserProfile = require('../models/UserProfile')
const { UserType } = require('../config/auth');

// Property Page (Create) - Admin & Agent & Branch
router.get('/createProperty', async (req, res) => {
    console.log('Go to Create Property Page')
    const owners = await Owner.find({})
    res.render('registries/propertyRegistry', {
        login_User_ID: UserType(req, res),
        ownerlist: owners
    })
})

router.post('/createProperty', async (req, res) => {
    console.log('Start to register Property ...')
    const { Property_ID, District, Estate, Block_Num, Floor_Num, GrossFloorArea, NumOfBedroom, CarPark_Provided, Selling_Price, Rental_Price, Owner_ID } = req.body
    const owners = await Owner.find({})
    let errors = []

    // Validation
    if (!Property_ID || !District || !Estate || !Block_Num || !Floor_Num || !GrossFloorArea || !NumOfBedroom || !CarPark_Provided || !Selling_Price || !Rental_Price || !Owner_ID) {
        console.error('Please enter all fields')
        errors.push({ msg: 'Please enter all fields' })
        console.log(errors)
        res.render('registries/propertyRegistry', { login_User_ID: UserType(req, res), errorMessage: errors, ownerlist: owners })
    } else {
        Property.findOne({ Property_ID: Property_ID }).then(property => {
            if (property) {
                console.log('Property Record already exists')
                errors.push({ msg: 'Property record already exists' })
                res.render('registries/propertyRegistry', { login_User_ID: UserType(req, res), errorMessage: errors, ownerlist: owners })
            } else {
                const newProperty = new Property({
                    Property_ID: Property_ID,
                    Owner_ID: Owner_ID,
                    District: District,
                    Estate: Estate,
                    Block_Num: Block_Num,
                    Floor_Num: Floor_Num,
                    GrossFloorArea: GrossFloorArea,
                    NumOfBedroom: NumOfBedroom,
                    CarPark_Provided: CarPark_Provided,
                    Selling_Price: Selling_Price,
                    Rental_Price: Rental_Price
                })
                newProperty.save()
                console.log('Create Property successful')
                res.redirect('/')
            }
        })
    }
})

// Transaction (Create) - Agent
router.get('/createTransaction', async (req, res) => {
    console.log('Go to Create Transaction Page')
    const properties = await Property.find({})
    const owners = await Owner.find({})
    const customers = await Customer.find({})
    const agents = await Agent.find({})
    res.render('registries/transactionRegistry', {
        login_User_ID: UserType(req, res),
        propertylist: properties,
        ownerlist: owners,
        customerlist: customers,
        agentlist: agents
    })
})

router.post('/createTransaction', async (req, res) => {
    console.log('Start to register Transaction ...')
    console.log(req.body)
    const { Transaction_Ref, Transaction_Type, Transaction_Price, Transaction_Date, Property_ID, Owner_ID, Customer_ID, Agent_ID } = req.body
    const properties = await Property.find({})
    const owners = await Owner.find({})
    const customers = await Customer.find({})
    const agents = await Agent.find({})
    let errors = []

    // Validation
    if (!Transaction_Ref || !Transaction_Type || !Transaction_Price || !Transaction_Date || !Property_ID || !Owner_ID || !Customer_ID || !Agent_ID) {
        console.error('Please enter all fields')
        errors.push({msg: 'Please enter all field' })
        res.render('registries/transactionRegistry', {
            login_User_ID: UserType(req, res),
            propertylist: properties,
            ownerlist: owners,
            customerlist: customers,
            agentlist: agents
        })
    } else {
        let Commission = calCommission(Transaction_Type, Transaction_Price)
        console.log(Commission)
        if (Commission <= 0) {
            console.error('Transaction Price invalid')
            errors.push({msg: 'Transaction Price invalid' })
            res.render('registries/transactionRegistry', {
                login_User_ID: UserType(req, res),
                propertylist: properties,
                ownerlist: owners,
                customerlist: customers,
                agentlist: agents
            })
        } else {
            Transaction.findOne({ Transaction_Ref: Transaction_Ref }).then(transaction => {
                if (transaction) {
                    console.log('Transaction Record already exists')
                    errors.push({ msg: 'Transaction Record already exists' })
                    res.render('registries/transactionRegistry', {
                        login_User_ID: UserType(req, res),
                        propertylist: properties,
                        ownerlist: owners,
                        customerlist: customers,
                        agentlist: agents
                    })
                } else {
                    const newTransaction = new Transaction({
                        Transaction_Ref: Transaction_Ref,
                        Transaction_Type: Transaction_Type,
                        Transaction_Price: Transaction_Price,
                        Transaction_Date: Transaction_Date,
                        Property_ID: Property_ID,
                        Owner_ID: Owner_ID,
                        Customer_ID: Customer_ID,
                        Agent_ID: Agent_ID,
                        Commission: Commission
                    })
                    newTransaction.save()
                    console.log('Create Transaction successful')
                    res.redirect('/')
                }
            })
        }
    }    
})

// Agent (Create) - Admin & Branch
router.get('/createAgent', async (req, res) => {
    console.log('Go to Create Agent Page')
    const branches = await Branch.find({})
    res.render('registries/agentRegistry', {
        login_User_ID: UserType(req, res),
        branchlist: branches
    })
})

router.post('/createAgent', async (req, res) => {
    console.log('Start to register Agent Account ...')
    const { Agent_ID, LName_Agent, FName_Agent, Phone_Agent, Branch_ID, Password, Password2 } = req.body
    const branches = await Branch.find({})
    let errors = []

    // Validation
    if (!Agent_ID || !LName_Agent || !FName_Agent || !Phone_Agent || !Branch_ID || !Password || !Password2) {
        console.error('Please enter all fields')
        errors.push({ msg: 'Please enter all fields' })
    }

    if (Password != Password2) {
        console.error('Passwords do not match')
        errors.push({ msg: 'Passwords do not match' })
    }

    if (Password.length < 6) {
        console.error('Password must be at least 6 characters')
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('registries/agentRegistry', { login_User_ID: UserType(req, res), errorMessage: errors, branchlist: branches })
    } else {
        UserProfile.findOne({ User_ID: Agent_ID }).then(user => {
            if (user) {
                console.error('Agent Account already exists')
                errors.push({ msg: 'Agent Account already exists' })
                res.render('registries/agentRegistry', { login_User_ID: UserType(req, res), errorMessage: errors, branchlist: branches })
            } else {
                Agent.findOne({ Agent_ID: Agent_ID }).then(agent => {
                    if (agent) {
                        console.error('Agent already exists')
                        errors.push({ msg: 'Agent already exists' })
                        res.render('registries/agentRegistry', { login_User_ID: UserType(req, res), errorMessage: errors, branchlist: branches })
                    } else {
                        const newAgent = new Agent({
                            Agent_ID: Agent_ID,
                            LName_Agent: LName_Agent,
                            FName_Agent: FName_Agent,
                            Phone_Agent: Phone_Agent,
                            Branch_ID: Branch_ID
                        })
                        const newAgentUser = new UserProfile({
                            User_ID: Agent_ID,
                            User_Type: 'Agent',
                            Password: Password
                        })
                        newAgent.save()
                        console.log('Create Agent successful')
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newAgentUser.Password, salt, (err, hash) => {
                                if (err) throw err
                                newAgentUser.Password = hash
                                newAgentUser.save()
                                .then(user => {
                                    console.log('You are registered Agent Account now')
                                    res.redirect('/')
                                })
                                .catch(err => console.log(err))
                            })
                        })
                    }
                })
            }
        })
    }
})

// Customer (Create) - Admin & Agent & Branch
router.get('/createCustomer', async (req, res) => {
    console.log('Go to Create Customer Page')
    res.render('registries/customerRegistry', { 
        login_User_ID: UserType(req, res) 
    })
})

router.post('/createCustomer', async (req, res) => {
    console.log('Start to registry Customer Account ...')
    const { Customer_ID, LName_Customer, FName_Customer, Phone_Customer, Perferred_District, Perferred_Estate, Buying_Budget, Rental_Budget, Password, Password2 } = req.body
    let errors = []

    // Validation
    if (!Customer_ID || !LName_Customer || !FName_Customer || !Phone_Customer || !Password || !Password2) {
        console.log('Please make sure these field completed - (Customer ID, Customer Last Name, Customer Frist Name, Contact No., Password, Comfirm Password)')
        errors.push({ msg: 'Please make sure these field completed - (Customer ID, Customer Last Name, Customer Frist Name, Contact No., Password, Comfirm Password)' })
    }

    if (Password != Password2) {
        console.error('Passwords do not match')
        errors.push({ msg: 'Passwords do not match' })
    }

    if (Password.length < 6) {
        console.error('Password must be at least 6 characters')
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('registries/customerRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
    } else {
        UserProfile.findOne({ User_ID: Customer_ID }).then(user => {
            if (user) {
                console.error('Customer Account already exists')
                errors.push({ msg: 'Customer Account already exists' })
                res.render('registries/customerRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
            } else {
                Customer.findOne({ Customer_ID: Customer_ID }).then(customer => {
                    if (customer) {
                        console.error('Customer already exists')
                        errors.push({ msg: 'Customer already exists' })
                        res.render('registries/customerRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
                    } else {
                        const newCustomer = new Customer({
                            Customer_ID: Customer_ID,
                            LName_Customer: LName_Customer,
                            FName_Customer: FName_Customer,
                            Phone_Customer: Phone_Customer,
                            Perferred_District: Perferred_District,
                            Perferred_Estate: Perferred_Estate,
                            Buying_Budget: Buying_Budget,
                            Rental_Budget: Rental_Budget
                        })
                        const newCustomerUser = new UserProfile({
                            User_ID: Customer_ID,
                            User_Type: 'Customer',
                            Password: Password
                        })
                        newCustomer.save()
                        console.log('Create Customer successful')
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newCustomerUser.Password, salt, (err, hash) => {
                                if (err) throw err
                                newCustomerUser.Password = hash
                                newCustomerUser.save()
                                .then(user => {
                                    console.log('You are registered Customer Account now')
                                    res.redirect('/')
                                })
                                .catch(err => console.log(err))
                            })
                        })
                    }
                })
            }
        })
    }
})

// Owner (Create) - Admin & Agent & Branch
router.get('/createOwner', async (req, res) => {
    console.log('Go to Create Owner Page')
    res.render('registries/ownerRegistry', {
        login_User_ID: UserType(req, res)
    })
})

router.post('/createOwner', async (req, res) => {
    console.log('Start to register Owner Account ...')
    const { Owner_ID, LName_Owner, FName_Owner, Phone_Owner, Password, Password2 } = req.body
    let errors = []

    // Validation
    if (!Owner_ID || !LName_Owner || !FName_Owner || !Phone_Owner || !Password || !Password2) {
        console.error('Please enter all fields')
        errors.push({ msg: 'Please enter all fields' })
    }

    if (Password != Password2) {
        console.error('Passwords do not match')
        errors.push({ msg: 'Passwords do not match' })
    }

    if (Password.length < 6) {
        console.error('Password must be at least 6 characters')
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('registries/ownerRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
    } else {
        UserProfile.findOne({ User_ID: Owner_ID }).then(user => {
            if (user) {
                console.error('Owner Account already exists')
                errors.push({ msg: 'Owner Account already exists' })
                res.render('registries/ownerRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
            } else {
                Owner.findOne({ Owner_ID: Owner_ID }).then(owner => {
                    if (owner) {
                        console.error('Owner already exists')
                        errors.push({ msg: 'Owner already exists' })
                        res.render('registries/ownerRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
                    } else {
                        const newOwner = new Owner({
                            Owner_ID: Owner_ID,
                            LName_Owner: LName_Owner,
                            FName_Owner: FName_Owner,
                            Phone_Owner: Phone_Owner,
                        })
                        const newOwnerUser = new UserProfile({
                            User_ID: Owner_ID,
                            User_Type: 'Owner',
                            Password: Password
                        })
                        newOwner.save()
                        console.log('Create Owner successful')
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newOwnerUser.Password, salt, (err, hash) => {
                                if (err) throw err
                                newOwnerUser.Password = hash
                                newOwnerUser.save()
                                .then(user => {
                                    console.log('You are registered Agent Account now')
                                    res.redirect('/')
                                })
                                .catch(err => console.log(err))
                            })
                        })
                    }
                })
            }
        })
    }
})

// Branch (Create) - Admin
router.get('/createBranch', async (req, res) => {
    console.log('Go to Create Branch Page')
    res.render('registries/branchRegistry', {
        login_User_ID: UserType(req, res)
    })
})

router.post('/createBranch', async (req, res) => {
    console.log('Start to register Branch Account ...')
    const { Branch_ID, LName_Manager, FName_Manager, BranchName, Address, Password, Password2 } = req.body
    let errors = []

    // Validation
    if (!Branch_ID || !LName_Manager || !FName_Manager || !BranchName || !Address || !Password || !Password2) {
        console.error('Please enter all fields')
        errors.push({ msg: 'Please enter all fields' })
    }

    if (Password != Password2) {
        console.error('Passwords do not match')
        errors.push({ msg: 'Passwords do not match' })
    }

    if (Password.length < 6) {
        console.error('Password must be at least 6 characters')
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('registries/branchRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
    } else {
        UserProfile.findOne({ User_ID: Branch_ID }).then(user => {
            if (user) {
                console.error('Branch Account already exists')
                errors.push({ msg: 'Branch Account already exists' })
                res.render('registries/branchRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
            } else {
                Branch.findOne({ Branch_ID: Branch_ID }).then(branch => {
                    if (branch) {
                        console.error('Branch already exists')
                        errors.push({ msg: 'Branch already exists' })
                        res.render('registries/branchRegistry', { login_User_ID: UserType(req, res), errorMessage: errors })
                    } else {
                        const newBranch = new Branch({
                            Branch_ID: Branch_ID,
                            LName_Manager: LName_Manager,
                            FName_Manager: FName_Manager,
                            BranchName: BranchName,
                            Address: Address
                        })
                        const newBranchUser = new UserProfile({
                            User_ID: Branch_ID,
                            User_Type: 'Branch',
                            Password: Password
                        })
                        newBranch.save()
                        console.log('Create Branch successful')
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newBranchUser.Password, salt, (err, hash) => {
                                if (err) throw err
                                newBranchUser.Password = hash
                                newBranchUser.save()
                                .then(user => {
                                    console.log('You are registered Branch Account now')
                                    res.redirect('/')
                                })
                                .catch(err => console.log(err))
                            })
                        })
                    }
                })
            }
        })
    }
})

module.exports = router