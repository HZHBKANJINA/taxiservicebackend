const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Operator=require('../models/operator');

router.get('/',async(req,res)=>{
    try{
        const operators=await Operator.find().populate({path:'user',select:'email'});
        res.json(operators);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const operator=await Operator.findById(req.params.id).populate({path:'user',select:'email'});
        if(operator){
            res.json(operator);
        }else{
            return res.status(404).json({message:'Operator nije pronađen u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
    const operator=new Operator(req.body);
    try{
        const newOperator=await operator.save();
        res.status(201).json(newOperator);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const operator=await Operator.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(operator){
            res.json(operator);
        }else{
            return res.status(404).json({message:'Operator nije pronađen u bazi'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const operator=await Operator.findByIdAndDelete(req.params.id);
        if(operator){
            res.json(operator);
        }else{
            return res.status(404).json({message:'Operator nije pronađen u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;