const express = require('express');

const router = express.Router();
const mongoos = require('mongoose');
const User = mongoos.model("User");


// var Notes = require('../model/Notes');
// mongoos.model('Notes');
const Notes = mongoos.model("Notes");
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt')

require('dotenv').config();


//*********************SIGNUP ROUTE****************************/

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
//*********************SIGNIN ROUTE****************************/
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
           return res.json({token , id:savedUser._id});

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


//********************* SAVE NOTES ROUTES****************************/

router.post('/saveNotes', async(req, res) => {
    console.log(req.body)
    const {Content,Heading,user_id}=req.body;
    console.log(Content,Heading,user_id)
    // if (!Content || !Heading || !id || !user_id) {
    //     return res.status(422).json({error: 'Please enter all fields'})
    // }
    try{
        const notes = new Notes({Heading,Content,user_id})
        await notes.save();
        return res.json({message:"Notes Saved Successfully"});

    }
    catch(e){
        console.log(e)
        return res.json({error :e});
    }
})


//****************************FETCH NOTES*********************/

router.post('/FetchNotes/:id', async(req, res) => {
    console.log(req.params.id)
    const id=req.params.id;
    
    
    try{
        const notes=await Notes.find({user_id:id})
            if(!notes){
                console.log("No Notes Found")
            }
            else{
                // console.log(notes)
                return res.json({notes});
            }
        }

    
    catch(e){
        console.log(e)
        return res.json({error :e});
    }
})



module.exports = router;
