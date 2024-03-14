const mongoose=require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const certificatesSchema=new mongoose.Schema({
    _id:{
        type:Number
     },
    name: {
        type: String,
        required: true,
         },
    eng_id:{
        ref:'engineers',
        type:Number
        

    }
})
certificatesSchema.plugin(AutoIncrement, { id: 'certificatesCounter' });
const Certificates  = mongoose.model('Certificates' ,certificatesSchema )
module.exports= Certificates
