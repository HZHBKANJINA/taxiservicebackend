const mongoose=require('mongoose');

const passengerSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    address:{type:mongoose.Schema.Types.ObjectId,ref:'address'},
    phone:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
});

module.exports=mongoose.model('passenger',passengerSchema,'passengers');