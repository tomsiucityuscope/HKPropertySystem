module.exports = {
    Authenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/user/login')
    },
    NotAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/');
    }
}