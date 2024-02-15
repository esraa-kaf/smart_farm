
const fs = require('fs');
const mime  = require('mime');
exports.proccesAvatar=(avatar,paths)=>{
 // let file_name;
 const  docodedImg = avatar.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    // console.log("hiiiiiiiiiiiiiii",docodedImg)
    const response = {
      type: docodedImg[1], // element2 
      data: Buffer.from(docodedImg[2] , "base64"),//element 3
    };
    buffer = response.data;
    type = response.type;
    console.log("hiiiiiiiiiiiiiii",buffer)
    extension = mime.getExtension(type);
      console.log("extension====>",extension);
    if (!docodedImg) {
      return res.status(401).json({ error: 'Base64 string is required.' });
    }else{
        // const buffer = Buffer.from(base64String, 'base64');
         file_name=`${(new Date().getTime()/1000)|0}.${extension}`
        console.log("file_name   ",file_name)
        // console.log(`${file_name}.${type}`);
        fs.writeFileSync(`${process.cwd()}/public/images/${paths}/${file_name}`, buffer,"utf8");


       }
       return file_name;
}