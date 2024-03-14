const express=require('express')
const router= express.Router()

// var jwt = require('jsonwebtoken');

const  usercontroller = require('../controller/usercontroller')
const logincontroller= require('../controller/logincontroller')
const errorMW=require('../middleware/errorMw')
const authMw =require('../middleware/authMw')


const {validateNewUser,updateUserById,validateIdLength}=require("../validation/uservalidation")



// register add information (post)
router.post('/new-user' ,updateUserById,validateNewUser,errorMW,usercontroller.createNewUser);
       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//login
router.post('/signin',logincontroller.loginUser );
 
// update user by
 router.put('/user/:id',authMw, usercontroller.checkAuthorizationInnerUser  ,updateUserById  , errorMW  , usercontroller.updateUser);

// find user by id
router.get('/user/:id', authMw,validateIdLength,usercontroller.findUser)
// find all users

router.get('/user', authMw,usercontroller.findAll);

// delete one user by id
router.delete('/user/:id', authMw, usercontroller.checkAuthorizationInnerUser,validateIdLength,usercontroller.deleteUser);

// forgetpassword for user
router.post('/forget-password', usercontroller.forgetPassword)
// reset password
router.post('/reset-password/:hash',usercontroller.resetPassword)









module.exports=router


