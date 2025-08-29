const mongoose=require('mongoose');

const vehicleSchema=new mongoose.Schema({
    brand:String,
    model:String,
    license:String
});

module.exports=mongoose.model('vehicle',vehicleSchema,'vehicles');