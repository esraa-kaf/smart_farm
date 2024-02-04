const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose')
const multer  = require('multer')
var jwt = require('jsonwebtoken');
const validator = require('validator')
const bcryptjs = require('bcryptjs');
require('dotenv').config()
const userRouter= require('./routes/userRoute') 
const authMw  =require('./middleware/authMw')
const User=require("./models/usermodel")

app.use([userRouter])

///////////////////////////
// const date = new Date();
// data =date.getDate()
// console.log(data);
/////////////////////////
// const d = new Date();
// d.getTime();
// console.log(d);
/////////////////////////
// file system
//  const fs =require('fs');
// fs.readFile('esraa.txt', (err, data) => {
//    if(err){
//     console.log(err);
//     return;
//    }
//   console.log(data.toString())})

//   fs.writeFile('esraa.txt', "esraa",(err, data) => {
//     if(err){
//      console.log(err);
//      return;
//     }
//    console.log(data)})
 

//    fs.appendFile('esraa.txt', " mohamed",(err, data) => {
//     if(err){
//      console.log(err);
//      return;
//     }
//    console.log(data)})
 
// const  {cwd } = require('process');

// console.log(`Current directory: ${cwd()}`);


// console.log(__dirname);


// process.cwd
// const process = require('process');
// console.log(process.cwd());









mongoose.connect('mongodb://127.0.0.1:27017/myApp').then(()=>{
    const PORT =process.env.PORT ||3000;
    app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`)
  });
},
(error)=>{
  
  console.log(`DB connection error ${error.message}`)

})