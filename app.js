const express = require('express');
var bodyParser = require('body-parser')
const nodeCache = require( "./config/configCache" );
const path=require("path")
const app = express();
app.use(express.json({limit: '25mb'}));
app.use(bodyParser.text({ limit: '5mb' })); // Parse text body with a limit of 5MB
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken');
const validator = require('validator')
const bcryptjs = require('bcryptjs');
require('dotenv').config()
const userRouter= require('./routes/userRoute') 
const engineerRouter=require('./routes/engineerRoute')
const plantsRouter=require('./routes/plantsRoute')
const authMw  =require('./middleware/authMw')
const User=require("./models/usersModel")
const Engineer=require('./models/engineersModel')
const categories =require('./models/CategorgiesModel')
const plants=require('./models/plantsModel')
const RatingEng=require('./models/ratingsModel')
const Government=require('./models/governmentModel')
const City=require('./models/cityModel')
const Certificates=require('./models/CertificatesModel')
app.use([userRouter,engineerRouter,plantsRouter])
// app.use(engineerRouter)

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


///////////////////////////////////////////image///////////////
// const base64 = require('node-base64-image');
// const fs =require('fs');
// const {encode , decode}=require('node-base64-image')
// async function processing(){
//   //encode image to base64
//   const url="https://cdn.pixabay.com/photo/2022/09/18/14/23/baby-7463137_640.jpg"
//   const options = {
//     string: true
//   };
//   const image = await encode(url, options);
//   console.log(image);
// /////////////////////////////////////////////////////////////////////////////////////////////
// const imageSize = 1024 * 1024; // 1 MB
// const imageBuffer = Buffer.alloc(imageSize, image, 'base64');
// fs.writeFile('esraa.jpg', imageBuffer, (err) => {
//   if (err) {
//     console.error(err);
//   }
// });
//   fs.writeFileSync("base64",image)
//   // await decode(image,{fname:"baby girl",ext:"jpg"});
// }
// processing()














































app.use("/public", express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb://127.0.0.1:27017/myApp').then(()=>{

    const PORT =process.env.PORT ||3000;
    app.listen(PORT, ()=>{
      nodeCache.init()
    console.log(`app listening on port ${PORT}`)
  });
},
(error)=>{
  
  console.log(`DB connection error ${error.message}`)

})