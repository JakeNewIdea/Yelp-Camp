var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Camp 1",
            image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            author: {
                username: "Camp Liker"
            }
        },
        {
            name: "Camp 2",
            image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            author: {
                username: "Camp Liker"
            }
        },
        {
            name: "Camp 3",
            image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            author: {
                username: "Camp Liker"
            }
        }
    ];

function seedDB(){
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds");
            Comment.remove({},function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Removed comments");
                    // data.forEach(function(seed){
                    //     Campground.create(seed, function(err, campground){
                    //         if(err) {
                    //             console.log(err);
                    //         } else {
                    //             console.log("Added a campground");
                    //             Comment.create(
                    //                 {
                    //                     text: "This is the best camp ever", 
                    //                     author: {
                    //                         username: "Camp Liker"
                    //                     }
                    //                 }, function(err, comment){
                    //                     if(err) {
                    //                         console.log(err);
                    //                     } else {
                    //                         campground.comments.push(comment._id);
                    //                         campground.save();
                    //                         console.log("Created new comment");
                    //                     }
                    //                 }
                    //             )
                    //         }
                    //     })
                    // })
                }
            })
        }
    })
}

module.exports = seedDB;