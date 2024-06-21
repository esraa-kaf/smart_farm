const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)


const engineerSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
    name: {
        type: String,
        required: true,
        unique:true,
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
       
      
    },
    email:{
       type:String,
       required:true,
       unique: true,
       index: true,

    },
    governorate: { 
        type: Number,
         required: true,
         ref:'Government'
      },

    city: {
     type: Number,
     required: true,
     ref:'City'
        },
    department:{
    type: String,
    required: true
       },
    payment_amount:{
     required:true,
     type:Number
    },
    national_id:{
    required:true,
    type:String,
    
    }
    ,
    Faculty :{
        type:String
    }
    ,
    avatar:{
    type:String,
    default: 'https://cdn.pixabay.com/photo/2022/09/18/14/23/baby-7463137_640.jpg'
    
   }  
}
)
engineerSchema.plugin(AutoIncrement, { id: 'engineerCounter' });

// Engineer.index({email: 1, name: 1,phone:1}, {unique: true});

const Engineer = mongoose.model('engineers' ,engineerSchema )
module.exports=Engineer