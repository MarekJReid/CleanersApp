var Cleaner = require("../models/cleaners");
var Comment = require("../models/comment");
flash = require("connect-flash");
// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCleanerOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Cleaner.findById(req.params.id, function(err, foundCleaner){
           if(err){
               req.flash("error", "Cleaner has run away with the mouse");
               res.redirect("back");
           }  else {
               // does user own the Cleaner?
            if(foundCleaner.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Sorry bloke, walk on...");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in f00l...")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Unfortunetly you do not have access for that :[")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Please log in  first <|:]");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("err");
    req.flash("error", "Please log in  first <|:]");
    res.redirect("/login");
}

module.exports = middlewareObj;