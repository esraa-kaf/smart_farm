const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
 const governmentSchema=new mongoose.Schema({
    _id:{
        type:Number
     },
    name: {
        type: String,
        required: true,
         }
 })
 governmentSchema.plugin(AutoIncrement, { id: 'governmentCounter' });

 // Engineer.index({email: 1, name: 1,phone:1}, {unique: true});
 
 const Government = mongoose.model('Government' ,governmentSchema )
 module.exports=Government