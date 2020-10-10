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
    }
}