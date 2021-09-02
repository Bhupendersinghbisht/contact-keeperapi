const express=require('express')
const router=express.Router();
const jwt=require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const User=require('../models/User')
const bcrypt=require('bcryptjs')
const config=require('config')

//@route  POST   api/users
//@desc     register a user
//@access   public
 router.post('/',
 [
    check('name','Please add name').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','please enter a password of 7 or more character').isLength({min:6})
],

async (req,res) =>{    
    const {name,email,password}=req.body;    
  const errors= validationResult(req)
  if(!errors.isEmpty()){
      console.log('err',errors)
      return res.status(400).json({errors:errors.array()})
  }
//const {name,email,password}=req.body;
try {
    if(email){
    let user=await User.findOne({email})
    if(user){
        return res.status(400).json({msg:'User already exists'});
    }
}
    user=new User({
        name,
        email,
        password
    });
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(password,salt);
    await user.save();

    //res.send('USer Saved')
    const payload={
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:36000
    },(err,token) =>{
        if(err) throw err;
        res.json({token})
    })
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
}

  //   else{
//    return res.json({'passed':'true'})
//   }

})

module.exports=router;