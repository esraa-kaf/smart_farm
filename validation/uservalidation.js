const {body, check,param}=require("express-validator");
const User = require("../models/usermodel");
/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.validateNewUser=[
    body("name").notEmpty().withMessage("name is required .").isString().withMessage("name must string"),
    body("password").notEmpty().withMessage("name is required .").withMessage("password mustn't increase 12").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        // returnScore: false,
        // pointsPerUnique: 1,
        // pointsPerRepeat: 0.5,
        // pointsForContainingLower: 10,
        // pointsForContainingUpper: 10,
        // pointsForContainingNumber: 10,
        // pointsForContainingSymbol: 10,
      }).withMessage("password must be a strong "),

//   check("password").custom ((value)=>{ اخطاءك
//         console.log("===================")
//         const passwordRegExp=("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
//         if(!passwordRegExp.match(value)){
//             console.log(passwordRegExp.match(value))
//             throw new Error ("password must be strong ")
//         }
        
//       }),
    body("number").notEmpty().withMessage("number is required .").isNumeric().withMessage("number must be number").isLength(11).withMessage("number must be 11 char"),
    check("number").custom((value) => {
        return User.findOne( { number: value }).then((user) => {
          if (user) {
            return Promise.reject("number already in use");
          }
        });
      }),
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
  body("number").optional().isNumeric().withMessage("number must be number").isLength(11).withMessage("number must be 11 char"),
  check("number").optional().custom((value) => {
   // console.log("usssssssssser  req ",req.req._id)
    //const user_id=+req.req._id
      return User.findOne( { number: value }).then((user) => {
       //console.log("usssssssssser  req ",user)

        if (user) {
          return Promise.reject("number already in use");
        }
      });
    }),
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
