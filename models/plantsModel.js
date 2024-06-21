const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const plantSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
     name:{
   type:String,

 },
 about:{
   type:String,

 },
 benifits:{
  type:String,
 },
 cat_id:{
    type:Number,
    ref:'CategorgiesModel'
 },
 vits:{
    type:String,

 },
 image:{
   type:String,
   require:true
 }
 


})
plantSchema.plugin(AutoIncrement, { id: 'plantsCounter' });
const plants = mongoose.model('plants',plantSchema)
module.exports=plants