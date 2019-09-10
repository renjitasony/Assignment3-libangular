var mongoose = require('mongoose');
var schema = mongoose.Schema;
var authschema = new schema({
    authid:{type:String,required:true},       
    authname:{type:String,required:true},
    authgenre:String,  
    authlang:String,    
    authimage:{type:String}    
});

var authmodel = mongoose.model("author",authschema,"authors");
module.exports = authmodel;