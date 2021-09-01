const express=require('express')
const router=express.Router();

//@route  GET   api/auth
//@desc     get a logged in user
//@access   private
router.get('/',(req,res) =>{
    res.send('Get logged in user')
})

//@route  POST   api/auth
//@desc     Auth user and get token
//@access   public
router.post('/',(req,res) =>{
    console.log(req.body);
    res.send('log in user')
})

module.exports=router;