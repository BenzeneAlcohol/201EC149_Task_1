const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const connectDB = require('./config/mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts')

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.get('/' ,(req,res)=>{
    res.send("Hello and welcome to the brand new project");
})


app.listen(5000, (err)=>{
    if(err){
        console.log("Error");
    }
    console.log("Server is up and running at port 5000");
})