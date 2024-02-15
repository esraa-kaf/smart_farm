const mongoose =require('mongoose')



const engineerSchema = new mongoose.Schema({
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
        type: String,
         required: true
      },

    city: {
     type: String,
     required: true
        },
    department:{
    type: String,
    required: true
       },
 
     avatar:{
    type:String,
    default: 'd:\Films\special\خطوبتى\IMG_4338.jpg'


   }  
   
   
   
   //,
//   randomString: {
//     type: String

//   }
}
)
// Engineer.index({email: 1, name: 1,phone:1}, {unique: true});

const Engineer = mongoose.model('engineers' ,engineerSchema )
module.exports=Engineer