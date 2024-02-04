const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/usermodel");
 exports.loginUser =async(req, res)=>{
  console.log("rrrr ",req)
    const { number, password } = req.body;
    try {
      // Find the user by phonenumber
      const user = await User.findOne({ number });
      console.log(user);
     
      // Check if the user exists 
      if (user!=undefined ) {//user exist'
        //use bcrypt func (compare)=>(body password ,encrpted password )
        //  console.log(user);
       // generate token
      const token = await jwt.sign({_id:user._id .toString(),number:user.number}, process.env.secretKey,{expiresIn:'24h'})
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
      throw new Error("invalid number or password")

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