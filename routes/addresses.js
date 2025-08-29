const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Address=require('../models/address');

router.get('/',async(req,res)=>{
    try{
        const addresses=await Address.find();
        res.json(addresses);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const address=await Address.findById(req.params.id);
        if(address){
            res.json(address);
        }else{
            return res.status(404).json({message:'Adresa nije u pronađena u baz'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    const address=new Address(req.body);
    try{
        const newAddress=await address.save();
        res.status(201).json(newAddress);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const address=await Address.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(address){
            res.json(address);
        }else{
            return res.status(404).json({message:'Adresa nije pronađena u bazi'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const address=await Address.findByIdAndDelete(req.params.id);
        if(address){
            res.json(address);
        }else{
            return res.status(404).json({message:err.message});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;