const express=require('express')
const router= express.Router()
const authMw=require("../middleware/authMw")
const engineerController=require('../controller/engineerController')
const errorMW=require('../middleware/errorMw')
const logincontroller= require('../controller/logincontroller')
const {validateNewEng,updateEngById ,generateToken,validateRateEngineer,validateParamsId}=require("../validation/engineerValidation")


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

// rate one eng

router.post("/rate-eng",authMw,validateRateEngineer,errorMW,engineerController.rateEngineer)
// get eng by id 
router.get('/eng/:id', authMw,validateParamsId,errorMW,engineerController.findEng)

//get all eng 
router.get('/eng',authMw,engineerController.findAllEng)

//create governorate
router.post('/create-governorate',engineerController.createGovernorate)
// get all governorate
router.get('/get-AllGovernorate',engineerController.getAllGovernorate)
// create cities
router.post('/create-city',engineerController.createCity)
// get all cities by governorate-id
router.get('/get-allCitesById/:government_id',engineerController.getAllCitiesByGovernorateId)




module.exports=router