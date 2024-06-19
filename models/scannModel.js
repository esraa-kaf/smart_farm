const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)

const scannSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
     




      
})
scannSchema.plugin(AutoIncrement, { id: 'scannCounter' });
const Scann = mongoose.model('scann' ,scannSchema )
module.exports=Scann