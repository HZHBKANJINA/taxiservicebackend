const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Passenger=require('../models/passenger');

router.get('/',async(req,res)=>{
    try{
        const passengers= await Passenger.find().populate([
            {path:'address',select:'street town postalCode country'},
            {path:'user',select:'email'}
        ]);
        res.json(passengers);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const passenger=await Passenger.findById(req.params.id).populate([
            {path:'address',select:'street town postalCode country'},
            {path:'user',select:'email'}
        ]);
        if(passenger){
            res.json(passenger);
        }else{
            return res.status(404).json({message:'Putnik nije pronađen u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    const passenger=new Passenger(req.body);
    try{
        const newPassenger=await passenger.save();
        req.io.emit('addedPassenger');
        res.status(201).json(newPassenger);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const passenger=await Passenger.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(passenger){
            res.json(passenger);
        }else{
            return res.status(404).json({message:'Putnik nije pronađen u bazi'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const passenger=await Passenger.findByIdAndDelete(req.params.id);
        if(passenger){
            res.json(passenger);
        }else{
            return res.status(404).json({message:'Putnik nije pronađen u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;