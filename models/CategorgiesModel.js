const mongoose =require('mongoose')
const CategorgiesSchema=new mongoose.Schema({
 _id:Number,
 name:String,
 enum: ["summer", "winter"]
})
const categories=mongoose.model('categories',CategorgiesSchema)
module.exports=categories