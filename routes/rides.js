const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Ride=require('../models/ride');

router.get('/',async(req,res)=>{
    try{
        const rides=await Ride.find().populate([
            {path:'driver',select:'firstName lastName phone'},
            {path:'passenger',select:'firstName lastName phone user'},
            {path:'operator',select:'firstName lastName'},
            {path:'address',select:'street town postalCode country'},
            {path:'address',select:'street town postalCode country'}
        ]);
        res.json(rides);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const ride=await Ride.findById(req.params.id).populate([
            {path:'driver',select:'firstName lastName phone'},
            {path:'passenger',select:'firstName lastName phone user'},
            {path:'operator',select:'firstName lastName'},
            {path:'address',select:'street town postalCode country'},
            {path:'address',select:'street town postalCode country'}
        ]);
        if(ride){
            res.json(ride);
        }else{
            return res.status(404).json({message:'Vožnja nije pronađena'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    const ride=new Ride(req.body);
    try{
        const newRide=await ride.save();
        res.status(201).json(newRide);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const ride=await Ride.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(ride){
            res.json(ride);
        }else{
            return res.status(404).json({message:'Vožnja nije pronađena'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const ride=await Ride.findByIdAndDelete(req.params.id);
        if(ride){
            res.json(ride);
        }else{
            return res.status(404).json({message:'Vožnja nije pronađena'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;