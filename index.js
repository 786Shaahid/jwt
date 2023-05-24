const express=require('express');
const port=6000;
const app=express();
const ejs=require('ejs')
const mongoose=require('mongoose');
const passportjwt=require('./config/jwt-auth');

mongoose.connect('mongodb://127.0.0.1:27017/myapp');
const db=mongoose.connection;
db.on("open",()=>{
    console.log('Connected to mongodb');
})
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use('/user',require('./routes/home'))

app.listen(port,(err)=>{
    if(err) return console.log(`Error is coming on port:${err}`);
     console.log(`Server is running on the port:${port}`);
})
