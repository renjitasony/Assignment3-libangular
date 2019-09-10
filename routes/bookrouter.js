var express = require('express');
var multer = require('multer');
const path = require('path');

var book = require('../model/book');

const router = express.Router();
module.exports = router;

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'/../public/uploads/'));
    },
    filename:function(req,file,cb){
        // let fileExtension = file.mimetype.split("/").pop();  
        cb(null,"image_"+req.params.id+".jpg");
    }
});
var upload = multer({storage:storage});

router.get("/getbook/:id",(req,res)=>{
    book.findOne({bkid:req.params.id},(err,result)=>{
        if(err) throw err;
        else{
            res.send(result);
        }
    })
});
router.post("/add",(req,res)=>{    
    var b1 = new book();    
    b1.bkid = req.body.bid;
    b1.bktitle = req.body.btitle;
    b1.bkauthor = req.body.bauthor;
    b1.bkcategory = req.body.bcategory; 
        
    b1.save((err)=>{
        if(err) throw err;
        else{
            console.log("added book");
            res.send({msg:"Added book"});
        }
    })
});
router.post("/upload/:id",upload.single('bimage'),(req,res)=>{
    var bimage ="";
    if(req.file != undefined){
        bimage = "image_"+req.params.id+".jpg"; 
        book.updateOne({bkid:req.params.id},{$set:{bkimage:bimage}},(err)=>{
            if(err) throw err;
            res.send({msg:"uploaded image"})
        })          
    }else{
        res.send({msg:"No image"});
    }    
});

router.get("/delete/:id",(req,res)=>{
    book.deleteOne({bkid:req.params.id},(err)=>{
        if(err) throw err;
        else{
            res.send({msg:"Deleted"})
        }
    });
})

router.post("/update/:id",(req,res)=>{
    book.updateOne({bkid:req.params.id},{$set:{
        bktitle:req.body.btitle,
        bkauthor:req.body.bauthor,
        bkcategory : req.body.bcategory 
    }},(err)=>{
        if(err) throw err;
        else{
            res.send({msg:"Updated"});
        }
    })
});