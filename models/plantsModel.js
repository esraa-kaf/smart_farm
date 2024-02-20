const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
plantsSchema.plugin(AutoIncrement, { id: 'userCounter' });
const plantsSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
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