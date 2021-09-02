const express=require('express')
const router=express.Router();
const jwt=require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const bcrypt=require('bcryptjs');
const config=require('config')
const User = require('../models/User');
const auth=require('../middleware/auth')
//@route  GET   api/auth
//@desc     get a logged in user
//@access   private
router.get('/',auth, async(req,res) =>{
    try{
    const user=await User.findById(req.user.id).select('-password');
    res.json(user)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send('Server Error');
    }
    //res.send('Get logged in user')
})

//@route  POST   api/auth
//@desc     Auth user and get token
//@access   public
router.post('/',
[
    check('email','please include a valid email').isEmail(),
    check('password','password is required').exists()
],


async (req,res) =>{

    var errors=validationResult(req);
    if(!errors.isEmpty()){
console.log('Error..',errors)
res.status(403).json({errors:errors.array()})
    }
    const{email,password}= req.body;
    try {
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:'Invalid Email or Password'})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        console.log('isMatch',isMatch)
        console.log('pass',password)
        console.log('userpass',user.password)
        if(!isMatch){
            return res.status(400).json({mst:'Invalid password or Email'})
        }
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token) =>{
            if (err) throw err;
            res.json({token})
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!')
    }
})

module.exports=router;