const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Driver=require('../models/driver');

router.get('/',async(req,res)=>{
    try{
        const drivers=await Driver.find().populate({path:'address',select:'street town postalCode country'}).populate({path:'vehicle',select:'brand model license'});
        res.json(drivers);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const driver=await Driver.findById(req.params.id).populate({path:'address',select:'street town postalCode country'}).populate({path:'vehicle',select:'brand model license'});
        if(driver){
            res.json(driver);
        }else{
            return res.status(404).json({message:'Vozač nije pronađen u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    const driver=new Driver(req.body);
    try{
        const newDriver=await driver.save();
        req.io.emit('addedDriver',newDriver);
        res.status(201).json(newDriver);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const driver=await Driver.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(driver){
            res.json(driver);
        }else{
            return res.status(404).json({message:'Vozač nije pronađen u bazi'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const driver=await Driver.findByIdAndDelete(req.params.id);
        if(driver){
            res.json(driver)
        }else{
            return res.status(404).json({message:'Vozač nije pronađen u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;