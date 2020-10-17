const express = require('express')
const router = express.Router()
const { UserType } = require('../config/auth');

router.get('/', (req, res) => {
    console.log('Go to Home Page')
    res.render('home', { login_User_ID: UserType(req, res) })
})

module.exports = router