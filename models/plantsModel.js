const mongoose =require('mongoose')
const plantsSchema = new mongoose.Schema({
 _id: Number,
 name:{
   type:String,

 },
 about:{
   type:String,

 },
 after_disease:{
  type:String,
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