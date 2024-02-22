const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const diseaseAndTreatmentSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
 name_plant:{
   type:String,

 },
 description_disease:{
   type:String,

 },
 treatment:{
  type:String,
 },
 category_id:{
    type:Number,
    ref:'CategorgiesModel'
 },
 is_treatmented:{
    type:Boolean,
    default:false
 },
 disease_name:{
   type:String,
   require:false
 },
 disease_public_name:{
   type:String,
 },
 Active_ingredient:{
   type:String,

 }


})
diseaseAndTreatmentSchema.plugin(AutoIncrement, { id: 'diseaseAndTreatmentCounter' });
const diseaseAndTreatment = mongoose.model('diseaseAndTreatment',diseaseAndTreatmentSchema)
module.exports=diseaseAndTreatment