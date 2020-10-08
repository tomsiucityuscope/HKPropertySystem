const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('Go to Home Page')
    res.render('home') 
})

module.exports = router