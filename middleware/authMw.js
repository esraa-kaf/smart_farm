// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   let token, decoded;
//   try {
//     if (req.get("Authorization") == undefined) {
//       res.status(401).json({
//         status_code: 401,
//         data: null,
//         message: "You should register first",
//       });
//     } else token = req.get("Authorization").split(" ")[1];
//     decoded = jwt.verify(token, process.env.secretKey);
//     req.id = decoded.id;
//     req.name = decoded.name;
//     req.email = decoded.email;
//     req.avatar = decoded.avatar;
//   } catch (error) {
//     error.status = 401;
//     error.message = "You are not authorized to access this resource";
//     // next(error);
//     res.status(401).json({
//       status_code: 401,
//       data: null,
//       message: error.message,
//     });
//   }
//   if (decoded !== undefined) {
//     next();
//   }
// };
//////////////////////////////////////////////////////////////////////////////////////////////////////
// 




const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader= req.header('Authorization');
 
  if (!authHeader) {
      //Unauthorized response 
      return   res.status(401).json({
                status_code: 401,
                 data: null,
                message: "You should register first",
              });;
    }
  
    try {
    const token = authHeader && authHeader.split(' ')[1] // split remove (pearer from token ) , [1]= علشان يبدا من بعد المسافه بتاعت pearer
   
    const decoded = jwt.verify(token, process.env.secretKey);
    req._id = decoded._id;
    req.number= decoded.number
    next();
  } catch (err) {
    return res.status(401).json({ message: "you aren't authorized to access this resources"}); // expire , token not valid
  }
};