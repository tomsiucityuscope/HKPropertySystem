const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// Load UserProfile Model
const UserProfile = require('../models/UserProfile')

function initialize (passport) {
    console.log('Initialize passport')
    passport.use(new LocalStrategy({ usernameField: 'User_ID', passwordField: 'Password'},
        function(username, password, done) {
            UserProfile.findOne({ User_ID: username })
            .then(userProfile => {
                if (!userProfile) {
                    console.error('User ID is not registed')
                    return done(null, false, { message: 'User ID is not registed' })
                }
                try {
                    bcrypt.compare(password , userProfile.Password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            console.log('Password correct, Passed passport')
                            return done(null, userProfile)
                        } else {
                            console.error('Password incorrect')
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                } catch (err) {
                    return done(err)
                }
            })
        }
    ))
    passport.serializeUser(function(userProfile, done) { done(null, userProfile) })
    passport.deserializeUser(async function(userProfile, done) {
        const user = await UserProfile.findById(userProfile.id)
        done(null, user)
    })
}

module.exports = initialize