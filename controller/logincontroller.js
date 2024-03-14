const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/usersModel");
const Engineer = require("../models/engineersModel")
exports.loginUser = async (req, res) => {
  // console.log("rrrr ",req)
  try {
    // Find the user by phonenumber
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Check if the user exists 
    if (user != null) {//user exist'
      //use bcrypt func (compare)=>(body password ,encrpted password )
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) { //user exist but we check password 
        throw new Error("بياناتك غير صحيحه")
      }
      // generate token



      else {
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.secretKey, { expiresIn: '24h' })
        console.log("token", token);
        return res.json({
          success: true,
          data: user,
          message: 'تم تسجيل الدخول بنجاح',
          token
        });

      }
    }
    else {//user not exist in DB
      throw new Error("بياناتك غير صحيحه")

    }

  } catch (error) {
    res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message
    });
  }
};


///////////////////////////////////////////////////////login as eng///////////////////////////
exports.loginEng = async (req, res) => {
  const { email, password } = req.body
  try {
    // Find the user by email
    const eng = await Engineer.findOne({ email });
    console.log(eng);
    if (eng != undefined) {//user exist'

      // generate token
      const token = await jwt.sign({ _id: eng._id.toString(), email: eng.email }, process.env.secretKey, { expiresIn: '48h' })
      console.log(token);
      // check the password matches
      const passwordMatch = await bcrypt.compare(password, eng.password);
      if (passwordMatch) { //eng exist but we check password 
        res.json({
          success: true,
          data: eng,
          message: 'تم تسجيل الدخول بنجاح',
          token
        });
      }
      else {
        throw new Error("بياناتك غير صحيحه")

      }
    }
    else {//eng not exist in DB
      throw new Error("بياناتك غير صحيحه")

    }

  } catch (error) {
    res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message
    });
  }
}