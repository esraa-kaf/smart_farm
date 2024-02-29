const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const Engineer=require("../models/engineerModel")
 exports.loginUser =async(req, res)=>{
  // console.log("rrrr ",req)
  console.log(req.body);
    const { email, password } = req.body;
    try {
      // Find the user by phonenumber
      const user = await User.findOne({ email });
      console.log(user);
     
      // Check if the user exists 
      if (user!=undefined ) {//user exist'
        //use bcrypt func (compare)=>(body password ,encrpted password )
        //  console.log(user);
       // generate token
      const token = await jwt.sign({_id:user._id .toString(),email:user.email}, process.env.secretKey,{expiresIn:'48h'})
       console.log(token);
        // check the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
         //  console.log(passwordMatch);
        //   bcrypt.compare(req.body.password,hashpassword )
       
        if(passwordMatch){ //user exist but we check password 
           res.json({
            success: true,
             message: 'Sign-in successful',
             token
            });
     }
     else {
      throw new Error("invalid email or password")

     }
        }
        else{//user not exist in DB
          throw new Error("invalid number or password")

         }
       
    } catch (error) {
         res.status(500).json({
         success: false,
          message: 'Internal server error'
         });
    }
  };

  
///////////////////////////////////////////////////////login as eng///////////////////////////
exports.loginEng=async(req,res)=>{
  const {email , password} =req.body
  try {
    // Find the user by email
    const eng = await Engineer.findOne({ email });
    console.log(eng);
    if (eng!=undefined ) {//user exist'
      
     // generate token
    const token = await jwt.sign({_id:eng._id .toString(), email:eng.email}, process.env.secretKey,{expiresIn:'48h'})
     console.log(token);
      // check the password matches
      const passwordMatch = await bcrypt.compare(password, eng.password);
      if(passwordMatch){ //eng exist but we check password 
         res.json({
          success: true,
           message: 'Sign-in successful',
           token
          });
   }
   else {
    throw new Error("invalid number or password")

   }
      }
      else{//eng not exist in DB
        throw new Error("invalid number or password")

      }
     
  } catch (error) {
       res.status(500).json({
       success: false,
        message: 'Internal server error'
       });
  }
}