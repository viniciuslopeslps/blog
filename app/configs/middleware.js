
var userService = require("../services/userService.js");

function requireAuthentication(req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        res.redirect('/login');
    }
    userService.findByToken(token)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            }
            else{
                res.render('login', { message: 'User not found!' });
            }
        })
        .catch((e) => res.render('/login', { message: 'Ops.. somethis is wrong!' }));
}

module.exports = {
    requireAuthentication: requireAuthentication
}