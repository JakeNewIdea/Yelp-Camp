var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing");
});

// REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});

// REGISTER POST
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message + '.');
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash('success', 'Welcome to Yelp Camp, ' + user.username + ' !');
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

// LOGIN POST
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        badRequestMessage : 'Invalid username or password.',
        failureFlash: true,
    }), function(req, res){
});

// LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash('success', 'Successfully logged out.');
    res.redirect("/campgrounds");
});

module.exports = router;