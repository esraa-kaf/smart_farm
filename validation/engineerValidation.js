const { body, check, param } = require("express-validator");
const Engineer = require("../models/engineersModel");

/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.validateNewEng = [
  body("name").notEmpty().withMessage("name is required .").isString().withMessage("name must string"),
  check("name").custom((value) => {
    return Engineer.findOne({ name: value }).then((engineer) => {
      if (engineer) {
        return Promise.reject("name already in use");
      }
    });
  }),
  body("password").notEmpty().withMessage("name is required .").withMessage("password mustn't increase 12").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,

  }).withMessage("password must be a strong "),

  body("phone").notEmpty().withMessage("phone is required .").isNumeric().withMessage("phone must be number").isLength(11).withMessage("number must be 11 char"),
  check("phone").custom((value) => {
    // console.log("valllll     ", value)
    return Engineer.findOne({ phone: value }).then((engineer) => {
      // console.log("eeeeeeeeeeee", engineer);

      if (engineer) {
        // console.log("engineer        ", engineer);
        return Promise.reject("phone already in use");
      }
      else {
        // console.log("hhhhhhhhhhhhhh", engineer);
      }
    });
  }),
  body("city").notEmpty().withMessage("city is required .").isNumeric().withMessage("city must number"),
  body("payment_amount").notEmpty().withMessage("payment_amount is required").isNumeric().withMessage("payment_amount must be number"),
  body("governorate").notEmpty().withMessage("governorate is required .").isNumeric().withMessage("governorate must number"),
  body("department").notEmpty().withMessage("department is required").isString().withMessage("department  must string"),
  body("email").notEmpty().withMessage("email  is required").isEmail().withMessage("email must be valid"),
  check("email").custom((value) => {
    // console.log("valllll     ", value)
    return Engineer.findOne({ email: value }).then((engineer) => {
      // console.log("eeeeeeeeeeee", engineer);

      if (engineer) {
        // console.log("engineer        ", engineer);
        return Promise.reject("email already in use");
      }
      else {
        console.log("hhhhhhhhhhhhhh", engineer);
      }
    });
  })
  ,
  body("national_id").notEmpty().withMessage("national_id is required"),
  check("national_id").custom((value) => {
    let engineersIds = ['30208161300084', '30207011311693', '30204011316424', '30206081201716', '30207241301298 ']
    let isExist = (engineersIds.indexOf(`${value}`) > -1);
    if (!isExist) {
      return Promise.reject('you are not eng ')
    } else {
      return Promise.resolve('you are not eng ')
    }
  }),
  body("rating").notEmpty().withMessage("rating is required").isNumeric({ min: 1, max: 5 }).withMessage("rating must be number from 1-5")
]

////
exports.updateEngById = [
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
    return Engineer.findOne({ phone: value }).then((eng) => {
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
    // console.log("valllll     ", value)
    return Engineer.findOne({ email: value }).then((engineer) => {
      console.log("eeeeeeeeeeee", engineer);

      if (engineer) {
        // console.log("engineer        ", engineer);
        return Promise.reject("email already in use");
      }
      else {
        console.log("hhhhhhhhhhhhhh", engineer);
      }
    });
  })
  ,
  body("governorate").optional().isString().withMessage("governorate must string"),
  body("national_id").notEmpty().withMessage("national_id is required"),
  check("national_id").custom((value) => {
    let nationalIdArr = ['30208161300084', '30207011311693', '30204011316424', '30206081201716', '30207241301298 ']
    if (nationalIdArr.includes(value)) {
      return Promise.reject('fallid national ')
    }
  }),
  body("rating").notEmpty().withMessage("rating is required").isNumeric({ min: 1, max: 5 }).withMessage("rating must be number from 1-5"),
  param("id").isLength({ max: 24 })



]

////




exports.validateParamsId = [
  param("id")
  .notEmpty().withMessage("id is required")
  .isNumeric().withMessage("id must be a number")
  .isLength({ min: 1, max: 20 }).withMessage("id must be in 1 and 20")
];



////////////////////////
exports.generateToken = async function (id) {
  const token = jwt.sign({ _id: id.toString() }, "esraa1234")
  return token

}

// validateRateEngineer 
exports.validateRateEngineer = [
  // body rate enum
  // isIn([1,2,3,4,5])
  // required eng id 

  body("rate").notEmpty().withMessage("rate is required").isIn([1, 2, 3, 4, 5]).withMessage("rate must be in 1-5"),
  body("eng_id").notEmpty().withMessage("eng_id is required"),
  check("eng_id").custom(async (value) => {
    // console.log(value);
    let isExist = await Engineer.findOne({ _id: value })
    // console.log("eeeeeeeeeeee", isExist);
    if (isExist == null) {
      // console.log("eng_id        ", isExist);
      return Promise.reject("eng_id is not exist");
    } else {
      return Promise.resolve();

    }

  })

]
