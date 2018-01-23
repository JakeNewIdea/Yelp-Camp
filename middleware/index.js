var middlewareObj = {},
    Campground    = require("../models/campground"),
    Comment = require("../models/comment");

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You are required to login first.');
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash('error', 'Error occurred. Try again.');
                res.redirect("back");
            } else {
                if(campground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', 'No permission for the action taken.')
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash('error', 'You are required to login first.');
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, function(err, comment){
            if(err){
                req.flash('error', 'Error occurred. Try again.');
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('No permission for the action taken.')
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash('error', 'You are required to login first.');
        res.redirect("/login");
    }
};

module.exports = middlewareObj;