const {body, check,param}=require("express-validator");
const User = require("../models/userModel");
/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.validateNewUser=[
    body("name").notEmpty().withMessage("name is required .").isString().withMessage("name must string"),
    body("password").notEmpty().withMessage("name is required .").withMessage("password mustn't increase 12").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,

      }).withMessage("password must be a strong "),

//   check("password").custom ((value)=>{ اخطاءك
//         console.log("===================")
//         const passwordRegExp=("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
//         if(!passwordRegExp.match(value)){
//             console.log(passwordRegExp.match(value))
//             throw new Error ("password must be strong ")
//         }
        
//       }),
    body("phone").notEmpty().withMessage("number is required .").isNumeric().withMessage("number must be number").isLength(11).withMessage("number must be 11 char"),
    check("phone").custom((value) => {
        return User.findOne( { phone: value }).then((user) => {
          if (user) {
            return Promise.reject("phone already in use");
          }
        });
      }),
    check("email").custom((value) => {
      console.log("valllll     ",value)
        return User.findOne( { email:value }).then((user) => {
          console.log("eeeeeeeeeeee",user);

          if (user) {
            console.log("user        ",user);
            return Promise.reject("email already in use");
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
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
     
    }).withMessage("password must be a strong "),
  body("phone").optional().isNumeric().withMessage("phone must be number").isLength(11).withMessage("phone must be 11 char"),
  check("phone").optional().custom((value) => {
   // console.log("usssssssssser  req ",req.req._id)
    //const user_id=+req.req._id
      return User.findOne( { phone: value }).then((user) => {
       //console.log("usssssssssser  req ",user)

        if (user) {
          return Promise.reject("phone already in use");
        }
      });
    }),
    check("email").custom((value) => {
      console.log("valllll     ",value)
        return User.findOne( { email:value }).then((user) => {
          console.log("eeeeeeeeeeee",user);

          if (user) {
            console.log("engineer        ",user);
            return Promise.reject("email already in use");
          }
          else{
            console.log("hhhhhhhhhhhhhh",user);
          }
        });
      })
      ,
  body("city").optional().isString().withMessage("city must string"),
  body("governorate").optional().isString().withMessage("governorate must string"),
  param("id").isLength({max:24})
      


]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.validateIdLength = (req, res, next) => {
  const  _id  = req.params.id;
  console.log(req.params);
  console.log(_id.length);
  // Define the desired length (e.g., 24 characters)
  const desiredLength = 24;

  if (_id.length !== desiredLength) {
    return res.status(400).json({ success: false, message: `Invalid id length. It should be ${desiredLength} characters.` });
  }

  // If the id length is valid, proceed to the next middleware or route handler
  next();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.generateToken=async function(id){
  const token =jwt.sign({_id:id .toString()}, "esraa1234")
  return token
  
}
