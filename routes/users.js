const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const User=require('../models/user');
const auth=require('../middleware/auth');

router.get('/',async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(user){
            res.json(user);
        }else{
            return res.status(404).json({message:'Korisnik nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/',async(req,res)=>{
   try{
    const passwordHash=await bcrypt.hash(req.body.password,10);

    const user=new User({
        email:req.body.email,
        passwordHash:passwordHash,
        role:req.body.role
    });

    const newUser=await user.save();
    res.status(201).json(newUser);
   }catch(err){
        res.status(400).json({message:err.message});
   }
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await User.findOne({email});
        if (!user) return res.status(400).json({ message: 'Email nije registriran' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Pogrešna lozinka' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, email: user.email,role: user.role});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(user){
            res.json(user);
        }else{
            return res.status(404).json({message:'Korisnik nije pronađen'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(user){
            res.json(user);
        }else{
            return res.status(404).json({message:'Korisnik nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;