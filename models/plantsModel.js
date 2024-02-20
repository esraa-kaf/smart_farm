const mongoose =require('mongoose')
const plantsSchema = new mongoose.Schema({
 _id: Number,
 name:{
   type:String,

 },
 about:{
   type:String,
   size: String,
   size: large

 },
 after_disease:{
  type:Option,
  size: String,
  size: large
 },
 category_id:{
    type:Number,
    ref:'CategorgiesModel'
 },
 Is_treatmented:{
    type:Boolean,
    default:false
 }

})
const plants = mongoose.model('plants',plantsSchema)
module.exports=plants