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

const noteSchema= new mongoos.Schema({
    id_Notes:{
        type:String,
        require:true
    },
    Heading:{
            type:String,
            require:true
            
        },
    Content:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    }



    
    
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
mongoos.model("Notes",noteSchema)