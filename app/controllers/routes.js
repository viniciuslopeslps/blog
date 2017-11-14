var postService = require("../services/postService.js");
var userService = require("../services/userService.js");
var timeService = require("../services/timeService.js");
var _ = require("underscore");

module.exports = function (app) {

    app.get('/', function (req, res) {
        console.log('Cookies: ', req.cookies);        
        postService.findLastPosts()
            .then(posts => {
                res.render('index', {
                    lastPosts: posts, lastMonths: timeService.lastMonths
                })
            })
            .catch(err => res.render('error'));
    });

    app.get('/make-data', function (req, res) {
        res.render('makeData', { data: '' });
    });

    app.post('/make-data', function (req, res) {
        var body = _.pick(req.body, "smallTitle", "bigTitle", "about", "fullText");
        postService.createPost(body)
            .then(post => res.render('makeData', { data: { status: 200, message: 'Created with success!' } }))
            .catch(post => res.render('makeData', { data: { status: 500, message: 'Something is wrong!' } }));
    });

    app.get('/find/:id', function (req, res) {
        var params = _.pick(req.params, "id");
        postService.findById(parseInt(params.id))
            .then((post) => res.render('post', { post: post }))
            .catch((post) => res.render('error'));
    });

    app.get('/findByAllDate/', function (req, res) {
        var params = _.pick(req.query, "month", "year");
        postService.findAllByDate(params.year, params.month)
            .then(posts => {
                if(_.isEmpty(posts)){
                    res.render('noData')
                }
                res.render('index', {
                    lastPosts: posts, lastMonths: timeService.lastMonths
                })
            })
            .catch(err => res.render('error'));
    });

    app.get('/login', function (req, res) {
        res.render('login', { message: '' });
    });

    app.post('/login', function (req, res) {
        var body = _.pick(req.body, "email", "password");
        userService.findByEmail(body.email)
            .then(user => {
                if (!user || !userService.comparePasswords(body.password, user.dataValues)) {
                    res.redirect("/");
                }
                else {
                    var token = userService.generateToken('authentication', user);
                    console.log(token);
                    res.cookie('token', token, { maxAge: 900000 });
                    res.render("login", { message: "User found" })
                }
            }).catch(user => res.render("login", { message: "Login error" }));
    });

    app.get('/create-user', function (req, res) {
        res.render('createUser', { data: '' });
    });

    app.post('/create-user', function (req, res) {
        var body = _.pick(req.body, "email", "password");
        userService.createUser(body)
            .then(user => res.render('createUser', { data: { status: 200, message: 'Created with success!' } }))
            .catch(user => res.render('createUser', { data: { status: 500, message: 'Something is wrong!' } }));
    });

}