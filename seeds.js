var mongoose = require("mongoose");
var Cleaner = require("./models/cleaners");
var Comment = require("./models/comment");
var cleaner = [
    {
        name: "Mia Schmuck",
        image:  "https://images.unsplash.com/photo-1532363664322-b46b86cc86d9?ixlib=rb-0.3.5&s=8c140750cd270793f606a03ae7c861e4&auto=format&fit=crop&w=668&q=80",
        description: "Vestibulum porta ipsum ac neque venenatis lobortis. Integer egestas augue at tincidunt lacinia. In urna nisl, pretium sed nibh ut, gravida faucibus tortor. Praesent nec cursus enim, fringilla commodo erat. Sed quis convallis est, id pellentesque tortor. Vivamus ipsum magna, volutpat ac pretium ut, semper vitae lacus. Donec vel nunc a nisl consectetur lacinia. Vestibulum a ligula nec mi ullamcorper lobortis. Sed viverra pellentesque elit. Praesent molestie arcu nibh, sit amet porttitor nisl vulputate vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non pellentesque massa, nec tincidunt mauris"
    },
    {
        name: "Joe Capoe",
        image:  "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5c8cc4aa6a61a049647a5b76fa36d430&auto=format&fit=crop&w=728&q=80",
        description: "Vestibulum porta ipsum ac neque venenatis lobortis. Integer egestas augue at tincidunt lacinia. In urna nisl, pretium sed nibh ut, gravida faucibus tortor. Praesent nec cursus enim, fringilla commodo erat. Sed quis convallis est, id pellentesque tortor. Vivamus ipsum magna, volutpat ac pretium ut, semper vitae lacus. Donec vel nunc a nisl consectetur lacinia. Vestibulum a ligula nec mi ullamcorper lobortis. Sed viverra pellentesque elit. Praesent molestie arcu nibh, sit amet porttitor nisl vulputate vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non pellentesque massa, nec tincidunt mauris"
    },
    {
        name: "Ella Pin",
        image:  "https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9181fa2e4820c2bda893acc86731c6db&auto=format&fit=crop&w=668&q=80",
        description: "Vestibulum porta ipsum ac neque venenatis lobortis. Integer egestas augue at tincidunt lacinia. In urna nisl, pretium sed nibh ut, gravida faucibus tortor. Praesent nec cursus enim, fringilla commodo erat. Sed quis convallis est, id pellentesque tortor. Vivamus ipsum magna, volutpat ac pretium ut, semper vitae lacus. Donec vel nunc a nisl consectetur lacinia. Vestibulum a ligula nec mi ullamcorper lobortis. Sed viverra pellentesque elit. Praesent molestie arcu nibh, sit amet porttitor nisl vulputate vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non pellentesque massa, nec tincidunt mauris",
    },
    {
        name: "Bridget Yin",
        image:  "https://images.unsplash.com/photo-1513732822839-24f03a92f633?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c019fe313afd6ef860d09b17e8066559&auto=format&fit=crop&w=334&q=80",
        description: "Vestibulum porta ipsum ac neque venenatis lobortis. Integer egestas augue at tincidunt lacinia. In urna nisl, pretium sed nibh ut, gravida faucibus tortor. Praesent nec cursus enim, fringilla commodo erat. Sed quis convallis est, id pellentesque tortor. Vivamus ipsum magna, volutpat ac pretium ut, semper vitae lacus. Donec vel nunc a nisl consectetur lacinia. Vestibulum a ligula nec mi ullamcorper lobortis. Sed viverra pellentesque elit. Praesent molestie arcu nibh, sit amet porttitor nisl vulputate vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non pellentesque massa, nec tincidunt mauris",
    }
]

function seedDB() {
    //Remove ALL Cleaners
    Cleaner.remove({}, function (err, ) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed cleaner");
        }
    });
    //Add a few new claners to test with
    cleaner.forEach(function (seed){
        Cleaner.create(seed, function (err, cleaner){
           if(err){
            console.log(err);
           } else
           console.log("Added new seed cleaner");
           //add comment about cleaner
           Comment.create (
            {
                author: "Joeyblogsalotaboutbs",
                text: "bla"
            }, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    cleaner.comments.push(comment);
                    cleaner.save();
                    console.log("New Comment created!")
                }
            }
            
        )
        }) 
    });
    

}

module.exports = seedDB;

