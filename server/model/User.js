const mongoos = require('mongoose');
const bcrypt =require('bcrypt')
const userSchema= new mongoos.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
            type:String,
            require:true,
            unique:true
        },
    password:{
        type:String,
        require:true
    },



    
    
})
userSchema.pre('save',async function(next){
    const user=this;
    console.log("Just Befor Saving the user Before hashing",user.password);
    if(!user.isModified('password')){
        return next();
    }
    user.password= await bcrypt.hash(user.password,8);
    console.log("Just after savinh the user user After hashing",user.password)
    next();
})





mongoos.model("User",userSchema)