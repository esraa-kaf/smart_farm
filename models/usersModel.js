const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)

const userSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
     
     email:{
        type:String,
        required:true,
        unique: true,
        index: true,
 
     },
     
    phone:{
        type:String,
        trim:true,
        // unique:true
       
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
    default: 'https://cdn.pixabay.com/photo/2022/09/18/14/23/baby-7463137_640.jpg'


  }
  



      
})
userSchema.plugin(AutoIncrement, { id: 'userCounter' });
const User = mongoose.model('users' ,userSchema )
module.exports=User