const mongoose=require('mongoose');

const rideSchema=new mongoose.Schema({
    driver:{type:mongoose.Schema.Types.ObjectId,ref:'driver'},
    passenger:{type:mongoose.Schema.Types.ObjectId,ref:'passenger'},
    dateTime:Date,
    addRequest:String,
    endAddress:{type:mongoose.Schema.Types.ObjectId,ref:'address'}    
});

module.exports=mongoose.model('ride',rideSchema,'rides');