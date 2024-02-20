const mongoose=require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
plantsAvatarSchema.plugin(AutoIncrement, { id: 'userCounter' });
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
const plantsAvatars = mongoose.model('plantsAvatars',plantsAvatarSchema)
module.exports=plantsAvatars
