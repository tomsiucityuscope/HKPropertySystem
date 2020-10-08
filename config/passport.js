const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// Load UserProfile Model
const UserProfile = require('../models/UserProfile')

function initialize (passport) {
    console.log('Initialize passport')
    passport.use(new LocalStrategy(
        function(User_ID, Password, done) {
            UserProfile.findOne({ User_ID: User_ID }, function(err, userProfile) {
                if (err) {
                    console.error('Error for Query')
                    return done(err)
                }
                if (!userProfile) {
                    console.error('User ID is not registed')
                    return done(null, false, { message: 'User ID is not registed' })
                }
                if (!bcrypt.compare(Password, userProfile.Password)) {
                    console.error('Password incorrect')
                    return done(null, false, { message: 'Password incorrect' })
                }
                console.log('Passed passport')
                return done(null, userProfile)
            })
        }
    ))
    passport.serializeUser(function(userProfile, done) { done(null, userProfile.id) })
    passport.deserializeUser(function(id, done) {
        UserProfile.findById(id, function(err, userProfile) {
            done(err, userProfile)
        })
    })
}

module.exports = initialize