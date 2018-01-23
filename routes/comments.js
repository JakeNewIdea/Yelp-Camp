var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middlewareObj = require("../middleware");

// NEW
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            req.flash('error', 'Error occurred. Try again.');
            res.redirect("back");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            req.flash('error', 'Error occurred. Try again.');
            res.redirect("back");
        } else { 
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    req.flash('error', 'Error occurred. Try again.');
                    res.redirect("back");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    req.flash('success', 'Successfully added new comment.');
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:cid/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.cid, function(err, comment){
        if(err){
            req.flash('error', 'Error occurred. Try again.');
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundId: req.params.id, comment: comment});
        }
    });
});

// UPDATE
router.put("/:cid", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, comment){
        if(err){
            req.flash('error', 'Error occurred. Try again.');
            res.redirect("back");
        } else {
            req.flash('success', 'Successfully updated comment.');
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:cid", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.cid, function(err, comment){
        if(err){
            req.flash('error', 'Error occurred. Try again.');
            res.redirect("back");
        } else {
            Campground.findByIdAndUpdate(req.params.id, {
                $pull: {comments: comment._id}
            }, function(err){
                if(err){
                    console.log(err);
                } else {
                    req.flash('success', 'Successfully deleted comment.')
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;