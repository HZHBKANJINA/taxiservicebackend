const mongoose=require('mongoose');

const driverSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    address:{type:mongoose.Schema.Types.ObjectId,ref:'address'},
    phone:String,
    vehicle:{type:mongoose.Schema.Types.ObjectId,ref:'vehicle'}
});

module.exports=mongoose.model('driver',driverSchema,'drivers');