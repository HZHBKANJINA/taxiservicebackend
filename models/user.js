const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:String,
    passwordHash:String,
    role:String
});

module.exports=mongoose.model('user',userSchema,'users');