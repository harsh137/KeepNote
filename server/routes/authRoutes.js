const express = require('express');

const router = express.Router();
const mongoos = require('mongoose');
const User = mongoos.model("User");
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt')

require('dotenv').config();

router.post('/signup', (req, res) => {
    
    console.log("Send By Clint :- ", req.body);
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({error: 'Please enter all fields'})
    }

    User.findOne({email: email}).then(async (savedUser) => {
        if (savedUser) {
            return res.status(422).json({error: 'User Already exist'})
        }
        const user = new User({name, email, password})
        try {
            await user.save();
            const token=jwt.sign({_id:user._id},`${process.env.JWT_KEY}`);
             return res.json({token});

        } catch (err) {
            console.log("db err", err)
            return res.status(422).json({error: err.message})
        }
    })

})

router.post('/signin', async(req, res) => {
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(422).json({error: 'Please enter all fields'})
    }
     const savedUser=  await User.findOne({email:email})

     if(!savedUser){
        return res.status(422).json({error:"Invalid Credentials"});

     }  
     try{
        bcrypt.compare(password,savedUser.password,(err,result)=>{
           if(result){
            console.log("Password matched");
            const token=jwt.sign({_id: savedUser._id},`${process.env.JWT_KEY}`);
            console.log(token)
           return res.json({token});

           }
           else{
            console.log("Pass not matched")
            return res.status(422).json({error:"Invalid Credentials"});

           } 
        })
     }
     catch(err){
        console.log(err);
     }


})



module.exports = router;
