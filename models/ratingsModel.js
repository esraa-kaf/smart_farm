const mongoose=require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)
const ratingSchema= new mongoose.Schema({

_id:{
    type:Number
},
rate:{
    default:0,
    type:Number,
    enum:[1,2,3,4,5]
},
user_id:{
    type:Number,
    ref:'usersModel'
},
eng_id:{
    type:Number,
    ref:'engineersModel'
}
// ,
// allRate:{
//   type:Number,
//   default:0
// }


})
ratingSchema.plugin(AutoIncrement, { id: 'ratingCounter' });
const RatingEng=mongoose.model('RatingEng',ratingSchema)
module.exports=RatingEng