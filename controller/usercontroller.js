
const e = require("express");
const User = require("../models/usermodel");
const bcrypt = require('bcryptjs');
// const { checkUserPermession } = require("../middleware/updateUserAuthorization");
const notFoundMsg="user not exist to update!";
function comparePassword(password,confirm_password){
if(password!=confirm_password){
    throw new Error("password does not equal confirm password ")
}
}


exports.createNewUser=async(req,res)=>{
    const {name,number,password, governorate,city}=req.body;
    // comparePassword(password ,confirm_password)
    
       bcrypt.hash(password,8).then((hashpassword)=>{
        const user =new User({number:number,password:hashpassword,name,governorate,city}) // res.body = information in postman
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
  
    // sec step update
      // =====   if (cond) ? true cond : false cond
      
        user.name=req.body.name? req.body.name : user.name;
    user.password=req.body.password?hashedPassword:user.password;
    user.city=req.body.city ? req.body.city:user.city;
    user.governorate=req.body.governorate?req.body.governorate:user.governorate;
    user.number=req.body.number ? req.body.number:user.number;
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

