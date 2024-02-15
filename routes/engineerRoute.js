const express=require('express')
const router= express.Router()
const authMw=require("../middleware/authMw")
const engineerController=require('../controller/engineerController')
const errorMW=require('../middleware/errorMw')
const logincontroller= require('../controller/logincontroller')
const {validateNewEng,updateEngById ,generateToken}=require("../validation/engineerValidation")


//register
router.post('/new-engineer' , validateNewEng, errorMW, engineerController.createNewEng);
//login
router.post('/login-eng',logincontroller.loginEng,generateToken)

// update eng by
router.put('/eng/:id',authMw, engineerController.checkAuthorizationInnerUser  ,updateEngById  , errorMW  , engineerController.updateEng);

// forgetPasswordByEmail
router.post('/forget-password', engineerController.forgetPasswordByEmail)

//resetPassword
router.post('/reset-password/:hash',engineerController.resetPassword)




module.exports=router