
const e = require("express");
const User = require("../models/usersModel");
const path =require('path')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const imageMw=require("../middleware/imageMw");
const nodemailer = require('nodemailer')
const nodeCache = require("../config/configCache");
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
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.secretKey, { expiresIn: '24h' })
        console.log("token", token);
        user._doc.token = token 
        user.save()   

        .then((user) =>{res.status(200).json({
          status_code:200,
          data:user,
        message:"تم انشاء الحساب بنجاح"
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
      return  res.status(200).json({status_code:200, message:"تم تحديث البيانات بنجاح",data:User})
   
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
////////////////////////////////////////////////////////////////////////////////////
function generateRandomString() {
  return Math.floor(Math.random() * Date.now()).toString(36);


}

exports.forgetPassword=async(req,res)=>{
  const { email } = req.body
  const randomString = generateRandomString();
  console.log("randomString   ====>", randomString);
  const user = await User.findOne({ email })
  // console.log(eng);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "user isn't exist"
    })
  }
  // generatr fuc call here 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'esraakaf3@gmail.com',
      pass: `${[process.env.auth_path]}`,
    },
  });
  const mailOption = {
    from: 'esraakaf3@gmail.com',
    to: `${req.body.email}`,
    subject: 'Message',
    text: 'I hope this message gets delivered!',
    html: `
       <html>
       <head>Reset password Request</head>
       <body>
       <h1>Reset password </h1>
        <p> Dear ${user.name}</p>
        <p> we have recieved a request to reset password , to complete please click on this button </p>
         <button style= "background-color: #04AA6D; padding: 15px 32px;width: 200px;
         color:white;" ><a style="color:white" href=${process.env.live_url}/reset/${randomString}</a>Reset password</button>
        <p> thank you </p> 
              
       </body>
       </html>

      `
  }
  
  transporter.sendMail(mailOption, async (err, data) => {
    if (err) {
      // console.log(err);
      res.status(500).json({ err: err.message });

    } else {
      /////////////////////////// create an obj ///////////////
      const userObj = {
        hash: randomString,
        expireTime: `${new Date().getMinutes() + 120}`,
        email: email
      }
      // console.log(userObj.expireTime);


      //// send this obj in cash ////
      let cash = nodeCache.getMyCash()
      cash.set(`${userObj.hash}`, { hash: userObj.hash, email: userObj.email, expireTime: userObj.expireTime }, 7200)
      res.status(200).send('success email');

    }
  });
}

////////////////////////////////////////////////////
exports.resetPassword=async(req,res)=>{
  const { newPassword } = req.body
  const { hash } = req.params

  try {

    let userTest = nodeCache.getMyCash().get(`${hash}`)
    console.log("userTest   ================  ", userTest);
    let current_date = new Date()
    if (userTest && userTest.expireTime > current_date) {
      return res.status(400).json({ message: 'Invalid or expired reset .' })
    }

    const user = await User.findOne({ email: userTest.email })
    let hashedPassword;
    if (newPassword) {

      hashedPassword = await bcrypt.hash(newPassword, 8)
    }

    user.password = hashedPassword
    user.save()
    console.log("user    ", user);
    // delete my hash from my cache 
    let cash = nodeCache.getMyCash()
    cash.del(hash);
    return res.status(200).json({ message: 'تم تغيير كلمه المرور بنجاح' })



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' })
  }
}