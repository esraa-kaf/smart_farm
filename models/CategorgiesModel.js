const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const CategorgiesSchema=new mongoose.Schema({
 _id:{
    type:Number
 },
 name:String,

avatar:{
   type:String,

}

})
CategorgiesSchema.plugin(AutoIncrement, { id: 'categoriesCounter' });
const categories=mongoose.model('categories',CategorgiesSchema)
module.exports=categories