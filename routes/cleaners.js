require('dotenv').config();

var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Cleaner = require("../models/cleaners"),
    User = require("../models/user");
    middleware = require("../middleware");
    
    var NodeGeocoder = require('node-geocoder');
 
    var options = {
      provider: 'google',
      httpAdapter: 'https',
      apiKey: process.env.GEOCODER_API_KEY,
      formatter: null
    };
     
    var geocoder = NodeGeocoder(options);


//Index Page Route
router.get("/", function (req, res) {
    //find all the cleaner profiles 
    Cleaner.find({}, function (err, allCleaners) {
        if (err) {
            console.log(err);
            //display all cleaners from db on the page
        } else res.render("cleanerProfiles/index", {
            cleaners: allCleaners,
            currentUser: req.user
        })
    }) 
});


// New User Form Route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    console.log("hello");
    res.render("cleanerProfiles/new");
});

// Save New User Route
//CREATE - add new Cleaner to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to Cleaners array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.location, function (err, data) {
      if (err || !data.length) {
        req.flash('error', 'Invalid address');
        return res.redirect('back');
      }
      var lat = data[0].latitude;
      var lng = data[0].longitude;
      var location = data[0].formattedAddress;
      var newCleaner = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
      // Create a new Cleaner and save to DB
      Cleaner.create(newCleaner, function(err, newlyCreated){
          if(err){
              console.log(err);
          } else {
              //redirect back to Cleaners page
              console.log(newlyCreated);
              res.redirect("/cleanerProfiles");
          }
      });
    });
  });

//Show User Profile Route
router.get("/:id", function (req, res) {
    //find cleaner with the provided id
    Cleaner.findById(req.params.id).populate("comments ").exec(function (err, foundCleaner) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCleaner);
            res.render("cleanerProfiles/show", {
                cleaner: foundCleaner
            });
        }
    })
    req.params.id
})


//Edit Cleaner Route

router.get("/:id/edit", middleware.checkCleanerOwnership, function (req, res) {
    Cleaner.findById(req.params.id, function (err, foundCleaner){
        res.render("cleanerProfiles/edit", {cleaner: foundCleaner});
    });
    
    
});

//Post Edit = Update Route

// UPDATE Cleaner ROUTE
router.put("/:id", middleware.checkCleanerOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
      if (err || !data.length) {
        req.flash('error', 'Invalid address');
        return res.redirect('back');
      }
      req.body.cleaner.lat = data[0].latitude;
      req.body.cleaner.lng = data[0].longitude;
      req.body.cleaner.location = data[0].formattedAddress;
  
      Cleaner.findByIdAndUpdate(req.params.id, req.body.cleaner, function(err, cleaner){
          if(err){
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              req.flash("success","Successfully Updated!");
              res.redirect("/cleanerProfiles/" + cleaner._id);
          }
      });
    });
  });

//Delete Cleaner Route = DESTROY

router.delete("/:id", middleware.checkCleanerOwnership, function(req, res){
    Cleaner.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/cleanerProfiles/")
        } else {
            res.redirect("/cleanerProfiles");
        }
    })
})




module.exports = router;