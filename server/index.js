
const express=require('express');
const port=3000;

const app=express();
const bodyParser= require('body-parser');
require('./db');
require('./model/User')

const authRoutes= require('./routes/authRoutes');
const reqiredToken= require("./MiddleWare/AuthTokenReq")
//


app.use(bodyParser.json());
app.use(authRoutes);

app.get('/',reqiredToken,(req,res)=>{
    console.log(req.user);
    res.send(req.user);
    console.log("This is Home Page")
})



app.listen(port,()=>{
    console.log(`Server is Running on port :- `,{port})
})