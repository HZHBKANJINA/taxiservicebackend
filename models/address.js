const mongoose=require('mongoose');

const addressSchema=new mongoose.Schema({
    street:String,
    town:String,
    postalCode:String,
    country:String
});

module.exports=mongoose.model('address',addressSchema,'addresses');