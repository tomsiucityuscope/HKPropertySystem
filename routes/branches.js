const express = require('express')
const router = express.Router()
const Agent = require('../models/Agent')
const Branch = require('../models/Branch')

// List of Branch Manager Services
router.get('/', (req, res) => {
    res.render('branch/index') 
})

// Agent register Form
router.get('/agentRegister', async (req, res) => {
    try {
        const branches = await Branch.find({})
        const agent = new Agent()
        res.render('branch/agentRegister', {
            branchlist: branches,
            agent: agent
        })
    } catch {
        res.redirect('/branch')
    }
})

// Report
router.get('/report', (req, res) => {
    res.render('branch/report') 
})

// Create Agent
router.post('/', async (req, res) => {
    const agent = new Agent({
        Agent_ID: req.body.Agent_ID,
        LName_Agent: req.body.LName_Agent,
        FName_Agent: req.body.FName_Agent,
        Phone_Agent: req.body.Phone_Agent,
        Branch_ID: req.body.Branch_ID
    })
    try {
        const newagent = await agent.save()
        res.redirect('/branch')
    } catch {
        res.render('branch/agentRegister', {
            agent: agent,
            branchlist: await Branch.find({}),
            errorMessage: 'Error creating Agent'
        })
    } 
})

module.exports = router