
const Engineer = require('../models/engineersModel')
// const EngToken=require('../models/engToken')
const bcrypt = require('bcryptjs');
const imageMw = require("../middleware/imageMw")
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const nodeCache = require("../config/configCache");
const RatingEng = require('../models/ratingsModel');
const Government = require('../models/governmentModel');
const City = require('../models/cityModel');
const Certificates=require('../models/CertificatesModel')



exports.createNewEng = async (req, res) => {

  const { name, phone, email, password, national_id, governorate, city, department, payment_amount, Faculty, certificates } = req.body;
  // let testArray =['30208161300084','30207011311693','30204011316424','30206081201716','30207241301298 ']
  try {
    let hashpassword = await bcrypt.hash(password, 8);
    if (hashpassword) {
      const engineer = new Engineer({ name, phone, password: hashpassword, email, governorate, city, department, payment_amount, national_id, Faculty }) // res.body = information in postman
      await engineer.save()
      if (engineer) {
        if (certificates) {
            certificates.map((certificate)=>{
              const fileName =  imageMw.proccesAvatar(certificate, 'certificates');
              console.log("filename   ", fileName);
              const Certificate=new Certificates({name:fileName,eng_id:engineer._id});
              Certificate.save();
              // eng.certificates = fileName
            })

        }
        res.status(200).json({
          status_code: 200,
          data: engineer,
          message: "تم انشاء الحساب بنجاح"
        })
      }
    }
  }
  catch (error) {
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message
    })
  }
}

//////////////////////////////////
//update
exports.updateEng = async (req, res) => {
  const _id = req.params.id;
  const newPassword = req.body.password;
  let hashedPassword;
  if (newPassword) {

    hashedPassword = await bcrypt.hash(newPassword, 8)
  }
  Engineer.findById(_id).then(async (eng) => {
    console.log(eng);
    if (eng != null) {
      //id of user 
      // token id user send req 
      //  console.log(req.id)
      // user exist
      // نفذ ليا الفانكشن اللى جوا ملف updateUserAuthorization
      const { avatar, password, name, email, city, governorate, phone, payment_amount, Faculty } = req.body;
      if (avatar) {
        // call you func (avatar) 
        // convertAvatar();
        // return name of image  
        // return file.filename;
        const fileName = await imageMw.proccesAvatar(avatar, 'engineers');
        console.log("filename   ", fileName)
        eng.avatar = fileName
      }
      // sec step update
      // =====   if (cond) ? true cond : false cond
      eng.name = name ? name : eng.name;
      eng.password = password ? hashedPassword : eng.password;
      eng.email = email ? email : eng.email
      eng.city = city ? city : eng.city;
      eng.governorate = governorate ? governorate : eng.governorate;
      eng.phone = phone ? phone : eng.phone;
      eng.Faculty = Faculty ? Faculty : eng.Faculty;
      // eng.certificates = certificates ? certificates : eng.certificates;
      eng.payment_amount = payment_amount ? payment_amount : eng.payment_amount;
      console.log("updatttttt ", eng)
      eng.save();
      return res.status(200).json({ status_code: 200, message: "updated", data: Engineer })

    }

    else {
      // eng not exist 
      throw new Error(notFoundMsg)
      // now new error will be this error from my messsage
    }

  }).catch(
    (error) => {
      console.log(error)
      return res.status(500).json({ success: false, status_code: 500, message: "Internal Server Error", data: null })
    }
  )
}

exports.checkAuthorizationInnerUser = async (req, res, next) => {
  // user id req ,  updated
  console.log(req._id) // دا اللى موجود فى ال token
  console.log(req.params.id) // دا اللى بدخله فى البرامز
  if (req.params.id != req._id) {
    res.status(403).json({ status_code: 403, message: "you are not authorized to update this user or delete" })


  } else {
    next()
  }
}


function generateRandomString() {
  return Math.floor(Math.random() * Date.now()).toString(36);


}
// 
exports.forgetPasswordByEmail = async (req, res) => {
  const { email } = req.body
  const randomString = generateRandomString();
  console.log("randomString   ====>", randomString);
  const eng = await Engineer.findOne({ email })
  // console.log(eng);

  if (!eng) {
    res.status(401).json({
      success: false,
      message: "eng isn't exist"
    })
  }
  // generatr fuc call here 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    //  host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    auth: {
      user: 'esraakaf3@gmail.com',
      pass: `${[process.env.auth_path]}`,
    },
  });
  const mailOption = {
    from: 'esraakaf3@gmail.com',
    to: `${req.body.email}`,
    subject: 'Message',
    text: 'I hope this message gets delivered!',
    html: `
       <html>
       <head>Reset password Request</head>
       <body>
       <h1>Reset password </h1>
        <p> Dear ${eng.name}</p>
        <p> we have recieved a request to reset password , to complete please click on this button </p>
         <button style= "background-color: #04AA6D; padding: 15px 32px;width: 200px;
         color:white;" ><a style="color:white" href=${process.env.live_url}/reset/${randomString}</a>Reset password</button>
        <p> thank you </p> 
              
       </body>
       </html>

      `
  }


  transporter.sendMail(mailOption, async (err, data) => {
    if (err) {
      // console.log(err);
      res.status(500).json({ err: err.message });

    } else {
      /////////////////////////// create an obj ///////////////
      const userObj = {
        hash: randomString,
        expireTime: `${new Date().getMinutes() + 120}`,
        email: email
      }
      // console.log(userObj.expireTime);


      //// send this obj in cash ////
      let cash = nodeCache.getMyCash()
      cash.set(`${userObj.hash}`, { hash: userObj.hash, email: userObj.email, expireTime: userObj.expireTime }, 7200)
      res.status(200).send('success email');

    }
  });
}

exports.resetPassword = async (req, res) => {

  const { newPassword } = req.body
  const { hash } = req.params

  try {

    let userTest = nodeCache.getMyCash().get(`${hash}`)
    console.log("userTest   ================  ", userTest);
    let current_date = new Date()
    if (userTest && userTest.expireTime > current_date) {
      return res.status(400).json({ message: 'Invalid or expired reset .' })
    }

    const eng = await Engineer.findOne({ email: userTest.email })
    let hashedPassword;
    if (newPassword) {

      hashedPassword = await bcrypt.hash(newPassword, 8)
    }

    eng.password = hashedPassword
    eng.save()
    console.log("eng    ", eng);
    // delete my hash from my cache 
    let cash = nodeCache.getMyCash()
    cash.del(hash);
    return res.status(200).json({ message: 'Password reset successfully.' })



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' })
  }
}

exports.rateEngineer = async (req, res) => {
  const { eng_id, rate } = req.body;
  const user_id = +req._id; // to make id be integar  
  console.log("ussser   ", user_id)
  try {

    let rating = await RatingEng.findOne({ user_id, eng_id })
    console.log("old rating====   > ", rating)

    if (rating != null) {
      // update

      console.log("old rating====   > ", rating)
      console.log("i will update")
      rating.rate = rating ? rate : rating.rate
      await rating.save();

    } else {
      // not exist 
      // create
      console.log("i will create ")
      const newRate = new RatingEng({ user_id, eng_id, rate });
      await newRate.save();
    }
    return res.status(200).json({
      status_code: 200,
      data: null,
      message: "success"
    });
  }
  catch (error) {
    res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message
    });
  }
}

// get eng by id and get rate ,too
exports.findEng = async (req, res) => {
  const _id = req.params.id
  try {
    let eng = await Engineer.findById({ _id }, 'id  name phone email city governorate department payment_amount ').populate({ path: "city", select: "_id name" }).populate({ path: "governorate", select: "_id name" })
    //  .populate({path:"certificates",select:"name eng-id"})
    if (eng) {
      let eng_certificates=await Certificates.find({eng_id:eng._id});
      eng_certificates.map((certificate)=>{
        certificate.name="/public/images/engineers/"+certificate.name
        eng._doc.certificate=certificate.name
      })
      console.log("eng_certificates   ",eng_certificates);

      const ratings = await RatingEng.find({ eng_id: _id });
      let eng_rate = 0; rate_avg = 0;
      if (ratings.length > 0) {
        ratings.map((item) => {
          eng_rate += item.rate
        })
        rate_avg = Math.round(eng_rate / ratings.length)
      }
      eng._doc.rate = rate_avg; //set key to eng object at real time
      return res.status(200).json({
        status_code: 200,
        // message: "eng is exist",
        data: eng
      })
    } else {
      throw new Error("eng is'nt exist")
    }
  }
  catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: error.message,
      data: null
    })
  }


}


//
exports.findAllEng = async (req, res) => {
  Engineer.find({}).then((eng) => {
    if (eng) {
      // console.log(user);
      return res.status(200).json({ status_code: 200, data: eng })
    } else {
      res.status(404).json({ status_code: 404, message: "eng isn't exist", data: null })
    }

  })
}

////////////////////////////////////////////////////////**********************************************//////////////////////////////////////////////

//create governorate
exports.createGovernorate = async (req, res) => {
  try {
    const { name } = req.body
    const newGovernorate = new Government({ name })
    await newGovernorate.save();
    console.log("newGovernorate   >>>>", newGovernorate);
    res.status(200).json({ status_code: 200, message: "كله فل الفل ", data: newGovernorate });

  }
  catch (error) {
    res.status(500).json({ status_code: 500, error: error.message, data: null });

  }
}

/// get all governorate
exports.getAllGovernorate = async (req, res) => {
  try {
    const AllGovernorates = await Government.find({})
    res.status(200).json({ status_code: 200, data: AllGovernorates });
  }
  catch (error) {
    res.status(500).json({ status_code: 500, error: error.message, data: null });

  }
}

// create city
exports.createCity = async (req, res) => {
  try {
    const { name, government_id } = req.body;
    const newCity = new City({ name, government_id })
    await newCity.save();
    console.log("newCity  >>>>", newCity);
    res.status(200).json({ status_code: 200, message: "كله فل الفل ", data: newCity });


  }
  catch (error) {
    res.status(500).json({ status_code: 500, error: error.message, data: null });
  }

}
// get all cities by governorate-id
exports.getAllCitiesByGovernorateId = async (req, res) => {
  try {
    const cities = await City.find({ government_id: req.params.government_id }, 'name')
    res.status(200).json({ status_code: 200, data: cities });

  }
  catch (error) {
    res.status(500).json({ status_code: 500, error: error.message, data: null });
  }

}

