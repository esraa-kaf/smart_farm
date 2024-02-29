
const e = require("express");
const User = require("../models/userModel");
const path =require('path')
const bcrypt = require('bcryptjs');
const imageMw=require("../middleware/imageMw");
const { error } = require("console");
const twilio = require('twilio');
// const { checkUserPermession } = require("../middleware/updateUserAuthorization");
const notFoundMsg="user not exist to update!";
function comparePassword(password,confirm_password){
if(password!=confirm_password){
    throw new Error("password does not equal confirm password ")
}
}


exports.createNewUser=async(req,res)=>{
    const {name,phone,email,password, governorate,city}=req.body;
    // comparePassword(password ,confirm_password)
    
       bcrypt.hash(password,8).then((hashpassword)=>{
        const user =new User({phone,password:hashpassword,name,email,governorate,city}) // res.body = information in postman
        user.save()   

        .then((user) =>{res.status(200).json({
          status_code:200,
          data:user,
        message:"user created successfully"
        })}) 
         // if it is not okay , show me error
        .catch((error)=>{res.status(500).json({          
          status_code:500,
          data:null,
          message:error.message
        })})
        
       });
      

///////////
  //      const userExist =  User.findOne({ number })
  //      console.log(userExist);
  
   //     if (userExist) {
   //       return 'User with this phone number already exists';
   //     }
        // Continue with your logic here if the user doesn't exist
      
   //  throw((error) => {
   //    console.error('Error checking user existence:', error);
        // Handle the error appropriately
   //  });


        //////////////////////////////////////////////////////////
      
     
       
     //  const userExist =  User.findOne({number})
     //  if(userExist){
     //   return ('User with this phone number already exists');
     //  }
     

}


///////////////////////////////////////////////////////////////
//find one user by id

exports.findUser=(req,res)=>{
  console.log(req.params)
 const _id = req.params.id
  User.findById(_id).then((user)=>{
   if(user){
    console.log(user);
     return  res.status(200).json({status_code:200, message:"user is exist",data:data.User})
   }else{
     throw new Error("user is'nt exist")
   }
  
  })
}
/////////////////////////////////////////////////////
//find all users  

exports.findAll=(req,res)=>{
  console.log("rrrrrrr",req._id, req.number)
  User.find({}).then((user)=>{
   if(user){
    // console.log(user);
     return  res.status(200).json({status_code:200, message:"user is exist",data:user})
   }else{
    res.status(404).json({status_code:404, message:"user isn't exist",data:null})
   }
  
  })
}

////////////////////////////////////////////////////////////////////
// delete one user by id
exports.deleteUser=(req,res)=>{
  const _id = req.params.id
  User.findById(_id).then(async(user)=>{
     if(user!=null){
     // user exist  // sec step delete
     // نفذ ليا الفانكشن اللى جوا ملف updateUserAuthorization
    // console.log("exist ",user)
     const user= await User.deleteOne({_id :_id})
       return  res.status(200).json({status_code:200, message:"User deleted successfully",data:user})
     }
     return res.status(404).json({ success: false, message: 'User not found.' });
 
    }).catch(
     (error)=>{
      console.log(error)
       return res.status(500).json( { success:false,status_code:500, message:"Internal Server Error",data:null})
     }
   )
}

//////////////////////////////////////////////////////////////
//update one user by id 
exports.updateUser=async (req,res)=>{
 const _id = req.params.id;
 const newPassword = req.body.password;
 let hashedPassword;
 if(newPassword){
   
    hashedPassword = await bcrypt.hash(newPassword, 8)
  }
 User.findById(_id).then(async (user)=>{
  console.log(user);
   if(user!=null){
     //id of user 
     // token id user send req 
     //  console.log(req.id)
    // user exist
 // نفذ ليا الفانكشن اللى جوا ملف updateUserAuthorization
    const {avatar,password,name,email,city,governorate,number}=req.body;
      if (avatar){
        // call you func (avatar) 
        // convertAvatar();
        // return name of image  
        // return file.filename;
        const fileName = await imageMw.proccesAvatar(avatar,'users');
        console.log("filename   ",fileName)
         user.avatar=fileName
      }
        // sec step update
      // =====   if (cond) ? true cond : false cond
    user.name=name? name : user.name;
    user.password=password?hashedPassword:user.password;
    user.city=city ? city:user.city;
    eng.email=email?email:eng.email;
    user.governorate=governorate?governorate:user.governorate;
    user.number=number ? number:user.number;
    console.log("updatttttt ",user)
    user.save();
      return  res.status(200).json({status_code:200, message:"updated",data:User})
   
  }
    
    else{
      // user not exist 
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
/////////////////////////////////////////////
// authorize the inner user by check id in req and id in params

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




/// forget password by phone
// exports.forgetPasswordByPhone=async(req,res)=>{
//   const { number } = req.body;
//    // Find the user by phonenumber
//   //  const user = await User.findOne({ number });
//   //  console.log(user);
//   //  if(!user){
//   //   res.status(401).json({
//   //     success: false,
//   //      message: "user isn't exist"
//   //     })
//   // }
  
//   // Generate a random 6-digit OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000);
// }
// const otp = generateOTP();
// console.log("otp         ===> ",otp);
// // In-memory storage for OTPs 
// const otpStorage = {};
// otpStorage[number] = otp;
// ///////////////////////////////////////
// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const twilioClient = require('twilio')(accountSid, authToken);
//   // Send OTP via SMS
// function sendOTP(number, otp) {
//   return twilioClient.messages.create({
//     body: `Your OTP for password reset: ${otp}`,
//     from: '+16503628529', // your twillo number
//     to: number, 
//   });
// }

// sendOTP(number, otp)
// .then(() => {
//   res.json({ success: true, message: 'OTP sent successfully' });
// })
// .catch((error) => {
//   console.error('Error sending OTP:', error);
//   res.status(500).json({ success: false, message: 'Failed to send reset otp' });
// });



// // try{
// //   twilioClient.messages .create({
// //     body: `Your OTP for password reset: ${otp}`,
// //     from: '+201024033970',   // From a valid Twilio number
// //     to: `${req.body.number}`, // Text your number
    
// //   })
// //   res.json({ success: true, message: 'Password reset otp sent successfully.' })
// //   }

// //   catch (error) {
// //     console.error(error);
// //     res.status(500).json({ success: false, message: 'Failed to send reset otp.' });
// //   }
  

// }
