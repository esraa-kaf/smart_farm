const mongoose=require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const citySchema=new mongoose.Schema({
    _id:{
        type:Number
     },
    name: {
        type: String,
        required: true,
         },
    government_id:{
        ref:'governmentModel',
        type:Number

    }
})
citySchema.plugin(AutoIncrement, { id: 'cityCounter' });
const City = mongoose.model('City' ,citySchema )
 module.exports=City
