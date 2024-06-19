const {body, check,param}=require("express-validator");
const User = require("../models/usersModel");
/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.validateNewUser=[
    body("name").notEmpty().withMessage(" لازم تدخل اسمك").isString().withMessage("name must string"),
    body("password").notEmpty().withMessage(" لازم تدخل كلمه المرور").isStrongPassword({
        minLength: 6,
        // minLowercase: 1,
        // minUppercase: 1,
        // minNumbers: 1,
        // minSymbols: 1,

      }).withMessage("كلمه المرور لازم تكون اكبر من 6 حروف او ارقام  "),

//   check("password").custom ((value)=>{ اخطاءك
//         console.log("===================")
//         const passwordRegExp=("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
//         if(!passwordRegExp.match(value)){
//             console.log(passwordRegExp.match(value))
//             throw new Error ("password must be strong ")
//         }
        
//       }),
    body("phone").notEmpty().withMessage(" لازم تدخل رقمك").isNumeric().withMessage("لازم يكون ارقام بس").isLength(11).withMessage("لازم يكون 11 رقم"),
    check("phone").custom((value) => {
        return User.findOne( { phone: value }).then((user) => {
          if (user) {
            return Promise.reject("الرقم دا مستخدم قبل كدا ");
          }
        });
      }),
    check("email").custom((value) => {
      // console.log("valllll     ",value)
        return User.findOne( { email:value }).then((user) => {
          // console.log("eeeeeeeeeeee",user);

          if (user) {
            // console.log("user        ",user);
            return Promise.reject("الايميل مستخدم قبل كدا");
          }
          else{
            console.log("hhhhhhhhhhhhhh",user);
          }
        });
      })
      ,
    body("city").notEmpty().withMessage("city is required .").isString().withMessage("city must string"),
    body("governorate").notEmpty().withMessage("governorate is required .").isString().withMessage("governorate must string")
    
    
]
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.updateUserById=[
  body("name").optional().isString().withMessage("name must string"),
  body("password").optional().isStrongPassword({
      minLength: 6,
      // minLowercase: 1,
      // minUppercase: 1,
      // minNumbers: 1,
      // minSymbols: 1,
     
    }).withMessage("password must be a strong "),
  body("phone").optional().isNumeric().withMessage(" لازم تدخل رقمك").isLength(11).withMessage("لازم يكون 11 رقم"),
  check("phone").optional().custom((value) => {
   // console.log("usssssssssser  req ",req.req._id)
    //const user_id=+req.req._id
      return User.findOne( { phone: value }).then((user) => {
       //console.log("usssssssssser  req ",user)

        if (user) {
          return Promise.reject("الرقم دا مستخدم قبل كدا ");
        }
      });
    }),
    check("email").custom((value) => {
      console.log("valllll     ",value)
        return User.findOne( { email:value }).then((user) => {
          console.log("eeeeeeeeeeee",user);

          if (user) {
            console.log("engineer        ",user);
            return Promise.reject("الايميل مستخدم قبل كدا");
          }
          else{
            console.log("hhhhhhhhhhhhhh",user);
          }
        });
      })
      ,
  body("city").optional().isString().withMessage("city must string"),
  body("governorate").optional().isString().withMessage("governorate must string"),
  // param("id").isLength({max:24})
      


]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.validateIdLength = (req, res, next) => {
//   const  _id  = req.params.id;
//   // console.log(req.params);
//   // console.log(_id.length);
//   // Define the desired length (e.g., 24 characters)
//   const desiredLength = 24;

//   if (_id.length !== desiredLength) {
//     return res.status(400).json({ success: false, message: `Invalid id length. It should be ${desiredLength} characters.` });
//   }

//   // If the id length is valid, proceed to the next middleware or route handler
//   next();
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.generateToken=async function(id){
  const token =jwt.sign({_id:id .toString()}, "esraa1234")
  return token
  
}
