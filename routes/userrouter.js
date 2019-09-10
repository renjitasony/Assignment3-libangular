var express = require('express');
var muser = require('../model/user');
const router = express.Router();
module.exports = router;

router.post("/login",function(req,res){
    muser.findOne({username:req.body.username,password:req.body.password},
            (err,result)=>{
                if(err) throw err;
                else if(result == null){
                    res.send({status:false});
                }else{
                    res.send({status:true});
                }
            });
    
});

router.post("/register",(req,res)=>{
    var u1 = new muser(); 
    u1.name = req.body.name;
    u1.mob = req.body.mob;
    u1.username = req.body.username;
    u1.mail = req.body.mail;
    u1.password = req.body.password;
    u1.save((err)=>{
        if(err) throw err;
        else{
            res.send({msg:"New user added"});
        }
    });
});