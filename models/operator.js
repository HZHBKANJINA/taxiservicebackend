const mongoose=require('mongoose');

const operatorSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    phone:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
});

module.exports=mongoose.model('operator',operatorSchema,'operators');