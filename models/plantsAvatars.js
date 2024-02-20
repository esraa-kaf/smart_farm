const mongoose=require('mongoose')
const plantsAvatarSchema=new mongoose.Schema({
  _id:Number,
  avatar:String,
  status:{
    type: String,
     enum: ["after", "before"]
    },
    plants_Id:ref('plantsModel')

  
})
const plantsAvatars = mongoose.model('plantsAvatars',plantsAvatarSchema)
module.exports=plantsAvatars
