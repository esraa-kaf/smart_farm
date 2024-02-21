const {body, check,param}=require("express-validator");
const Engineer = require("../models/engineerModel");
/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.validateNewEng=[
    body("name").notEmpty().withMessage("name is required .").isString().withMessage("name must string"),
    body("password").notEmpty().withMessage("name is required .").withMessage("password mustn't increase 12").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
     
      }).withMessage("password must be a strong "),
     
    body("phone").notEmpty().withMessage("phone is required .").isNumeric().withMessage("phone must be number").isLength(11).withMessage("number must be 11 char"),
    check("phone").custom((value) => {
      console.log("valllll     ",value)
        return Engineer.findOne( { phone:value }).then((engineer) => {
          console.log("eeeeeeeeeeee",engineer);

          if (engineer) {
            console.log("engineer        ",engineer);
            return Promise.reject("phone already in use");
          }
          else{
            console.log("hhhhhhhhhhhhhh",engineer);
          }
        });
      }),
    body("city").notEmpty().withMessage("city is required .").isString().withMessage("city must string"),
    body("payment_amount").notEmpty().withMessage("payment_amount is required").isNumeric().withMessage("payment_amount must be number"),
    body("governorate").notEmpty().withMessage("governorate is required .").isString().withMessage("governorate must string"),
    body("department").notEmpty().withMessage("department is required").isString().withMessage("department  must string"),
    body("email").notEmpty().withMessage("email  is required").isEmail().withMessage("email must be valid"),
    check("email").custom((value) => {
      console.log("valllll     ",value)
        return Engineer.findOne( { email:value }).then((engineer) => {
          console.log("eeeeeeeeeeee",engineer);

          if (engineer) {
            console.log("engineer        ",engineer);
            return Promise.reject("email already in use");
          }
          else{
            console.log("hhhhhhhhhhhhhh",engineer);
          }
        });
      })
    
]

////
exports.updateEngById=[
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
      return Engineer.findOne( { phone: value }).then((eng) => {
       //console.log("usssssssssser  req ",user)

        if (eng) {
          return Promise.reject("phone already in use");
        }
      });
    }),
  body("city").optional().isString().withMessage("city must string"),
  body("payment_amount").notEmpty().withMessage("payment_amount is required").isNumeric().withMessage("payment_amount must be number"),
  body("email").notEmpty().withMessage("email  is required").isEmail().withMessage("email must be valid"),
  check("email").custom((value) => {
    console.log("valllll     ",value)
      return Engineer.findOne( { email:value }).then((engineer) => {
        console.log("eeeeeeeeeeee",engineer);

        if (engineer) {
          console.log("engineer        ",engineer);
          return Promise.reject("email already in use");
        }
        else{
          console.log("hhhhhhhhhhhhhh",engineer);
        }
      });
    })
  ,
  body("governorate").optional().isString().withMessage("governorate must string"),
  param("id").isLength({max:24})
      


]

////
exports.generateToken=async function(id){
  const token =jwt.sign({_id:id .toString()}, "esraa1234")
  return token
  
}
