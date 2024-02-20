const mongoose=require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const plantsAvatarSchema=new mongoose.Schema({
    _id:{
        type:Number
     },
  avatar:String,
  status:{
    type: String,
     enum: ["after", "before"],
     default:"before"
    },
    plants_Id:ref('plantsModel')

  
})
plantsAvatarSchema.plugin(AutoIncrement, { id: 'plantsAvatarCounter' });
const plantsAvatars = mongoose.model('plantsAvatars',plantsAvatarSchema)
module.exports=plantsAvatars
