module.exports = {
    Authenticated: function(req, res, next) {
        if (req.session.passport) {
            console.log('Is Authenticated')
            return next()
        }
        console.log('Cannot pass - Is not Authenticated')
        res.redirect('/user/login')
    },
    NotAuthenticated: function(req, res, next) {
        if (!req.session.passport) {
            console.log('Is not Authenticated')
            return next()
        }
        console.log('Cannot pass - Is Authenticated')
        res.redirect('/');
    },
    UserType: function(req, res) {
        if (!req.session.passport) {
            console.log('No login')
            return null
        } else {
            console.log('Login by ' + req.session.passport.user.User_Type)
            return req.session.passport.user.User_Type
        }
    }
}