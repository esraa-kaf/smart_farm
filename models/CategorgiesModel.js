const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
CategorgiesSchema.plugin(AutoIncrement, { id: 'userCounter' });
const CategorgiesSchema=new mongoose.Schema({
 _id:{
    type:Number
 },
 name:String,
 enum: ["summer", "winter"]
})
const categories=mongoose.model('categories',CategorgiesSchema)
module.exports=categories