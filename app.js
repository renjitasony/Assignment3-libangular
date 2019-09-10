var express = require('express');
var bodyparser = require("body-parser");
var mongoose = require('mongoose');

const chalk = require('chalk');
const path = require('path');

var userrouter = require('./routes/userrouter');
var bookrouter = require('./routes/bookrouter');
var book = require('./model/book');
var author = require('./model/author');

var url = "mongodb+srv://sonyrenjita:mangoHONET@cluster0-sbret.mongodb.net/Library?retryWrites=true&w=majority"

const app =express();

mongoose.connect(url,{useNewUrlParser:true},function(err){
    if(err) throw err
    else{
        console.log("db connected");
    }
})

app.use(function (req, res, next) {   
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');  
    res.setHeader('Access-Control-Allow-Credentials', true);   

    next();
})
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use("/user",userrouter);
app.use("/book",bookrouter);


app.get("/",function(req,res){
    res.send("Success");
});
app.listen(process.env.PORT || 8090,function(req,res){
    console.log("server started"+chalk.red('8090'));
});

app.get("/authors",(req,res)=>{
    author.find({},function(err,result){
        if(err) throw err;
        else{
            res.send(result);
        }
    });
});
app.get("/books",(req,res)=>{
    book.find({},function(err,result){
        if(err) throw err;
        else{
            res.send(result);
        }
    });
});

app.get("/view/:image",(req,res)=>{      
    res.sendFile(path.join(__dirname,'/public/uploads/',req.params.image));
});
