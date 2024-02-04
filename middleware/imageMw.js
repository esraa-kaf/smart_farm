
const multer = require('multer');
const path = require('path');

module.exports = (req, res, next) => {
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "../public/images/user");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
})
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
    
  }



};