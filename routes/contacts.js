const express=require('express')
const router=express.Router();

//@route  GET   api/contacts
//@desc     Get a user contact
//@access   private
router.get('/',(req,res) =>{
    res.send('Get a user contact')
})

//@route  POST   api/contacts
//@desc     Add user contact
//@access   private
router.post('/',(req,res) =>{
    res.send('SAVE a user contact')
})

//@route  PUT   api/contacts/:id
//@desc     Update contact
//@access   private
router.put('/:id',(req,res) =>{
    res.send('UPDATE a user contact')
})


//@route  DELTE   api/contacts/:id
//@desc     Delete contact
//@access   private
router.put('/:id',(req,res) =>{
    res.send('Delete a user contact')
})

module.exports=router;