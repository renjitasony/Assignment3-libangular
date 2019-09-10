var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bkschema = new schema({
    bkid:{type:String,required:true},
    bktitle:{type:String,required:true},
    bkauthor:{type:String,required:true},
    bkcategory:{type:String,required:true},    
    bkpages:Number,
    bkprice:Number,
    bkimage:String
});

var bkmodel = mongoose.model("book",bkschema,"books");
module.exports = bkmodel;