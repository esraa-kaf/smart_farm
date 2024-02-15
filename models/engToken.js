const {mongoose,Schema}=require('mongoose')
const tokenSchema =new mongoose.Schema({

    engId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Eng",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 36500,
    },



})
const EngToken = mongoose.model('engtoken' ,tokenSchema )
module.exports=EngToken