const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Vehicle=require('../models/vehicle');

router.get('/',async(req,res)=>{
    try{
        const vehicles=await Vehicle.find();
        res.json(vehicles);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const vehicle=await Vehicle.findById(req.params.id);
        if(vehicle){
            res.json(vehicle);
        }else{
            return res.status(404).json({message:'Vozilo nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    const vehicle=new Vehicle(req.body);
    try{
        const newVehicle=await vehicle.save();

        req.io.emit('vehicleAdded',newVehicle);

        res.status(201).json(newVehicle);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const vehicle=await Vehicle.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(vehicle){
            res.json(vehicle);
        }else{
            return res.status(404).json({message:'Vozilo nije pronađeno'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const vehicle=await Vehicle.findByIdAndDelete(req.params.id);
        if(vehicle){
            res.json(vehicle);
        }else{
            return res.status(404).json({message:'Vozilo nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;