const jwt = require('jsonwebtoken');
const mongoos = require('mongoose');
const User=mongoos.model("User");
require('dotenv').config();

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    // console.log(authorization);
    if(!authorization){
        return res.status(401).json({
            error:'You must Logged in '
        });
    }
    const token=authorization.replace("Bearer ","");
    console.log(token)
    jwt.verify(token,`${process.env.JWT_KEY}`,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You Must Logged in , token invalid"});

        }
        const {_id}=payload;
        User.findById(_id).then(
            userData=>{
                req.user=userData;
                next();
            }
        );


    })
    
}