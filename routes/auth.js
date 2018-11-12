var express = require("express");
var router = express.Router();

// Landing Page Route
router.get("/", function (req, res) {
    res.render("landing");
});

// To New User Route
router.get("/register", function (req, res) {

    res.render("register");
});

// Process New User Route
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
          }
        
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to the team " + user.username);
            res.redirect("/cleanerProfiles");
        })
    });
});



// Show Login Form Route
router.get("/login", function(req, res){
    
    res.render("login"); 
 });
 // handling login logic
 router.post("/login", function (req, res, next) {
    passport.authenticate("local",
      {
        successRedirect: "/cleanerProfiles",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back to freedom finder " + req.body.username + "!"
      })(req, res);
  });

//Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are now logged out, caio! :]");
    res.redirect("/cleanerProfiles");
});



module.exports = router;
