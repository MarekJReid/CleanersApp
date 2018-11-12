var express = require("express"),
    router = express.Router({mergeParams: true}),
    Cleaner = require("../models/cleaners"),
    Comment = require("../models/comment");
    middleware = require("../middleware"); 
    var bodyParser = require('body-parser');
    var router = express.Router({mergeParams: true});

app.use(bodyParser());

// New Comment Route

router.get("/new", middleware.isLoggedIn, function (req, res) {
    Cleaner.findById(req.params.id, function (err, cleaner) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                cleaner: cleaner
            });

        }
    })
})

// Post and Redirect

router.post("/", function (req, res) {
    Cleaner.findById(req.params.id, function (err, cleaner) {
        if (err) {
            console.log(err);
            res.redirect("/cleanerProfiles");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Oopsie - Something failed here :/");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    cleaner.comments.push(comment);
                    cleaner.save();
                    console.log(comment);
                    req.flash("success", "Commented added :]");
                    res.redirect("/cleanerProfiles/" + cleaner._id);
                }

            })
        }
    })
})
// EDIT Comments

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
         res.render("comments/edit", {cleaner_id: req.params.id, comment: foundComment});
       }
    });
 });

 // COMMENT UPDATE ROUTE
 router.put("/:comment_id",  middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/cleanerProfiles/" + req.params.id);
       }
    });
 });

 // COMMENT DELETE (DESTROY) ROUTE

 router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function (err,){
        if(err){
            res.redirect("back");
        } else {
            req.flash("succes", "Comment is outttaaa here!")
            res.redirect("/cleanerProfiles/" + req.params.id);
        }
    })
 });

module.exports = router;