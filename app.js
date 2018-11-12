var express = require("express");
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");
flash = require("connect-flash");
passport = require("passport");
LocalStrategy = require("passport-local");
methodOverride = require("method-override");
Cleaner = require("./models/cleaners");
Comment = require("./models/comment");
User = require("./models/user");
seedDB = require("./seeds");

var commentsRoutes = require("./routes/comments"),
    cleanersRoutes = require("./routes/cleaners"),
    authRoutes = require("./routes/auth.js");



mongoose.connect("mongodb://localhost/cleaners");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seed Database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


 app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", authRoutes);
app.use("/cleanerProfiles/:id/comments", commentsRoutes);
app.use("/cleanerprofiles", cleanersRoutes);


app.listen(3000, function (req, res) {
    console.log("Get me outtaa heeeeeere!");
})