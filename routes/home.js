const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('Go to Home Page')
    if (req.session.passport == null ) {
        console.log(req.session.passport)
        res.render('home', { login_User_ID: req.session.passport })
    } else {
        console.log(req.session.passport.user.User_Type)
        res.render('home', { login_User_ID: req.session.passport.user.User_Type })
    }
})

module.exports = router