var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userschema = new schema({ 
    name:{type:String,required:true}, 
    mob:{type:Number,required:true}, 
    username:{type:String,required:true},     
    mail:String,
    password:{type:String,required:true}    
});

var umodel = mongoose.model("user",userschema,"user");
module.exports = umodel;