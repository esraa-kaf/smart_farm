const mongoose =require('mongoose')
const validator =require('validator')
const bcrypt = require('bcryptjs');
const { option, string } = require('yargs');
var jwt = require('jsonwebtoken');
const AutoIncrement = require("mongoose-sequence")(mongoose)

const userSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
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
userSchema.plugin(AutoIncrement, { id: 'userCounter' });
const User = mongoose.model('users' ,userSchema )
module.exports=User