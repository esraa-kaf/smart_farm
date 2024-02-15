const mongoose =require('mongoose')
const validator =require('validator')
const bcrypt = require('bcryptjs');
const { option, string } = require('yargs');
var jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    number:{
        type:String,
        trim:true,
        minlength:11,
        validate(val){
            if(!validator.isNumeric(val)){
                
                throw new Error ('you should enter valid phone!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
      
    },
    name: {
     type: String,
     required: true
  },

  city: {
     type: String,
     required: true
  },
  governorate: { 
    type: String,
     required: true
  },
  avatar:{
  
    type:String,
    default: 'd:\Films\special\خطوبتى\IMG_4338.jpg'


  }
  



      
})

//======defaultValue: http://placekitten.com/250/250
// //token

// userSchema.methods.generateToken =async function(id){
//     const token =jwt.sign({_id:id .toString()}, "esraa1234")
//     return token
    
// }



const User = mongoose.model('users' ,userSchema )
module.exports=User