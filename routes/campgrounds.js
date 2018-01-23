var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    middlewareObj = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//CREATE - create new campground to DB
router.post("/", middlewareObj.isLoggedIn, function(req, res) {
    Campground.create(req.body.campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            newlyCreated.author.id = req.user._id;
            newlyCreated.author.username = req.user.username;
            newlyCreated.save();
            req.flash('success', 'Successfully added new campground.');
            res.redirect("/campgrounds/" + newlyCreated._id);
        }
    });
});

//SHOW - show more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgroundFound){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: campgroundFound});
        }
    });
});

// EDIT
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: campground});
        }
    });
});

// UPDATE
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Successfully updated campground.');
            res.redirect("/campgrounds/" + campground._id);
        }
    });
});

// DESTROY
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Successfully deleted campground.');
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;