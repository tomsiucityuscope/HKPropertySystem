const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { NotAuthenticated } = require('../config/auth');

// Load User model
const UserProfile = require('../models/UserProfile')

// Register Page
router.get('/register', NotAuthenticated,  (req, res) => {
    console.log('Go to Register Page')
    res.render('register')
})

// Login Page
router.get('/login', NotAuthenticated, (req, res) => {
    console.log('Go to Login Page')
    res.render('login')
})

// Register
router.post('/register', NotAuthenticated, (req, res) => {
    console.log('Start to register new accont ...')
    console.log(req.body)
    const { User_ID, Password, Password2 } = req.body
    let errors = []

    if (!User_ID || !Password || !Password2) {
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
        res.render('register', {
            errors,
            User_ID,
            Password,
            Password2
        })
    } else {
        UserProfile.findOne({ User_ID: User_ID }).then(user => {
        if (user) {
            console.error('User already exists')
            errors.push({ msg: 'User already exists' })
            res.render('register', {
                errors,
                User_ID,
                Password,
                Password2
            })
        } else {
            const newUser = new UserProfile({
                User_ID: User_ID,
                User_Type: 'Customer',
                Password: Password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.Password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.Password = hash
                    newUser.save()
                    .then(user => {
                        console.log('You are now registered and can log in')
                        res.redirect('/user/login');
                    })
                    .catch(err => console.log(err))
                });
            });
        }
        });
    }
})

// Login
router.post('/login', NotAuthenticated, function(req, res, next) {
    console.log('Start to Login ...')
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.session.destroy(null);
    res.clearCookie(this.cookie, { path: '/' });
    req.logout();
    console.log(req.session)
    res.redirect('/user/login')
})

module.exports = router