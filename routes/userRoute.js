const express=require('express')
const User = require('../models/usermodel')
const router= express.Router()
// const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');

const  usercontroller = require('../controller/usercontroller')
const logincontroller= require('../controller/logincontroller')
const errorMW=require('../middleware/errorMw')
const authMw =require('../middleware/authMw')
const imageMw=require('../middleware/imageMw')
//const updateUserAuthorization=require('../middleware/updateUserAuthorization')

const {validateNewUser,updateUserById,validateIdLength,generateToken}=require("../validation/uservalidation")
const { unescape } = require('validator')

// register add information (post)

router.post('/new-user' ,updateUserById,validateNewUser,errorMW,usercontroller.createNewUser);
       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//login
router.post('/signin',logincontroller.loginUser ,generateToken);
 
// update user by
 router.put('/user/:id',authMw, usercontroller.checkAuthorizationInnerUser  ,updateUserById  , errorMW ,usercontroller.updateUser);

// find user by id
router.get('/user/:id', authMw,validateIdLength,usercontroller.findUser)
// find all users

router.get('/user', authMw,usercontroller.findAll);

// delete one user by id
router.delete('/user/:id', authMw, usercontroller.checkAuthorizationInnerUser,validateIdLength,usercontroller.deleteUser);

// upload image
router.post('/',imageMw)


module.exports=router


