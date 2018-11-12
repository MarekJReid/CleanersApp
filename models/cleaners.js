var mongoose = require("mongoose");

var cleanerSchema = new mongoose.Schema({
    name: String,
    rate: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
   image: String,
   description: String,
   location: String, 
   lat: Number, 
   lng: Number,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})

module.exports = mongoose.model("Cleaner", cleanerSchema);