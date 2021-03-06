const auth = require('../config/auth')
module.exports = {
    CanViewSellingPage: function(req, res, next) {
        var userType = auth.HiddenLog_UserType(req,res)
        if (userType == null || userType == "Admin"|| userType == "Customer"|| userType == "Owner") {
            return next()
        }
        console.log('Cannot view Selling Page')
        res.redirect('/user/login')
    },
    CanViewRentingPage: function(req, res, next) {
        var userType = auth.HiddenLog_UserType(req,res)
        if (userType == null || userType == "Admin"|| userType == "Customer"|| userType == "Owner") {
            return next()
        }
        console.log('Cannot view Renting Page')
        res.redirect('/user/login')
    },
    CanViewPropertyPage: function(req, res, next) {
        var userType = auth.HiddenLog_UserType(req,res)
        if (userType == "Agent" || userType == "Branch" || userType == "Admin") {
            return next()
        }
        console.log('Cannot view Property Page')
        res.redirect('/user/login')
    },
    CanDownloadReport: function(req, res, next) {
        var userType = auth.HiddenLog_UserType(req,res)
        if (userType == "Branch" || userType == "Admin") {
            return next()
        }
        console.log('Cannot Download Report')
        res.redirect('/user/login')
    }
}
    