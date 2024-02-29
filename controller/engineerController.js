
const Engineer=require('../models/engineerModel')
// const EngToken=require('../models/engToken')
const bcrypt = require('bcryptjs');
const imageMw=require("../middleware/imageMw")
const nodemailer=require('nodemailer')
const jwt = require('jsonwebtoken');
const nodeCache = require( "../config/configCache" );


exports.createNewEng=async(req,res)=>{

    const {name,phone,email,password, national_id,governorate,city,department,payment_amount}=req.body;
    let testArray =['30208161300084','30207011311693','30204011316424','30206081201716','30207241301298 ']
       
    
       bcrypt.hash(password,8).then((hashpassword)=>{
        const engineer = new Engineer({name,phone,password:hashpassword,email,governorate,city,department,payment_amount,national_id}) // res.body = information in postman
        console.log(engineer) 

        engineer.save()   
          
        .then((engineer) =>{res.status(200).json({
          status_code:200,
          data:engineer,
        message:"engineer created successfully"
        })}) 
       
         // if it is not okay , show me error
        .catch((error)=>{res.status(500).json({          
          status_code:500,
          data:null,
          message:error.message
        })})
        
       });
     
    }

//////////////////////////////////
//update
exports.updateEng=async (req,res)=>{
  const _id = req.params.id;
  const newPassword = req.body.password;
  let hashedPassword;
  if(newPassword){
    
     hashedPassword = await bcrypt.hash(newPassword, 8)
   }
  Engineer.findById(_id).then(async (eng)=>{
   console.log(eng);
    if(eng!=null){
      //id of user 
      // token id user send req 
      //  console.log(req.id)
     // user exist
  // نفذ ليا الفانكشن اللى جوا ملف updateUserAuthorization
     const {avatar,password,name,email,city,governorate,phone,payment_amount}=req.body;
       if (avatar){
         // call you func (avatar) 
         // convertAvatar();
         // return name of image  
         // return file.filename;
         const fileName = await imageMw.proccesAvatar(avatar,'engineers');
         console.log("filename   ",fileName)
          eng.avatar=fileName
       }
         // sec step update
       // =====   if (cond) ? true cond : false cond
       eng.name=name? name : eng.name;
       eng.password=password?hashedPassword:eng.password;
       eng.email=email?email:eng.email
       eng.city=city ? city:eng.city;
       eng.governorate=governorate?governorate:eng.governorate;
       eng.phone=phone ? phone:eng.phone;
       eng.payment_amount=payment_amount?payment_amount:eng.payment_amount;
       console.log("updatttttt ",eng)
       eng.save();
       return  res.status(200).json({status_code:200, message:"updated",data:Engineer})
    
   }
     
     else{
       // eng not exist 
       throw new Error(notFoundMsg)
       // now new error will be this error from my messsage
     }
 
    }).catch(
     (error)=>{
      console.log(error)
       return res.status(500).json( { success:false,status_code:500, message:"Internal Server Error",data:null})
     }
   )
 } 

 exports.checkAuthorizationInnerUser=async(req,res, next)=>{
  // user id req ,  updated
  console.log(req._id) // دا اللى موجود فى ال token
  console.log(req.params.id) // دا اللى بدخله فى البرامز
  if( req.params.id!= req._id){
      res.status(403).json({status_code:403, message:"you are not authorized to update this user or delete"})
      
      
    }else{
      next()
    }
}


function generateRandomString() {
  return Math.floor(Math.random() * Date.now()).toString(36);
  
 
}
// 
exports.forgetPasswordByEmail=async(req,res)=>{
    const {email}=req.body
    const randomString = generateRandomString();
    console.log("randomString   ====>",randomString);
    const eng = await Engineer.findOne({ email})
    // console.log(eng);
    
    if(!eng){
      res.status(401).json({
        success: false,
         message: "eng isn't exist"
        })
    }
// generatr fuc call here 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      //  host: "sandbox.smtp.mailtrap.io",
      // port: 2525,
      auth: {
        user: 'esraakaf3@gmail.com',
        pass: `${[process.env.auth_path]}`,
      },
    });
    const mailOption={
      from:'esraakaf3@gmail.com' ,
      to: `${req.body.email}`,
      subject: 'Message',
      text: 'I hope this message gets delivered!',
      html:`
       <html>
       <head>Reset password Request</head>
       <body>
       <h1>Reset password </h1>
        <p> Dear ${eng.name}</p>
        <p> we have recieved a request to reset password , to complete please click on this button </p>
         <button style= "background-color: #04AA6D; padding: 15px 32px;width: 200px;
         color:white;" ><a style="color:white" href=${process.env.live_url}/reset/${randomString}</a>Reset password</button>
        <p> thank you </p> 
              
       </body>
       </html>

      `
    }


  transporter.sendMail(mailOption, async(err, data) => {
    if(err){
      // console.log(err);
      res.status(500).json({err:err.message});

    }else{
/////////////////////////// create an obj ///////////////
const userObj={
  hash:randomString,
  expireTime: `${new Date().getMinutes() + 120}`,
  email:email
}
// console.log(userObj.expireTime);


 //// send this obj in cash ////
let cash=nodeCache.getMyCash()
cash.set(`${userObj.hash}`,{hash:userObj.hash,email:userObj.email,expireTime:userObj.expireTime},7200)
      res.status(200).send('success email');

    }
});
}

exports.resetPassword=async(req,res)=>{
  
  const { newPassword } = req.body
  const {  hash} = req.params
  
  try{

    let userTest = nodeCache.getMyCash().get(`${hash}`)
    console.log("userTest   ================  ",userTest);
    let current_date=new Date()
    if(userTest && userTest.expireTime > current_date){
      return res.status(400).json({ message: 'Invalid or expired reset .' })
    }
  
    const eng=await Engineer.findOne({email:userTest.email})
    let hashedPassword;
    if(newPassword){
      
      hashedPassword = await bcrypt.hash(newPassword, 8)
    }

    eng.password=hashedPassword
    eng.save()   
    console.log("eng    ",eng);
       // delete my hash from my cache 
      let cash=nodeCache.getMyCash()
      cash.del(hash);
     return  res.status(200).json({ message: 'Password reset successfully.' })
   
    
  
} catch(error){
  console.error(error);
  res.status(500).json({ message: 'Internal server error.' })
}
}