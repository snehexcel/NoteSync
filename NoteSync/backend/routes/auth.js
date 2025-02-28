const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');

var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET="Snehaisgoodgirl";


//Route1: Create a User using: POST "/api/auth/createUser". No login required
router.post('/createUser',[
    body('name','Enter a valid name as anu').isLength({min:3}),
    body('email',' Enter a valid email as abc@gmail.com').isEmail(),
    body('password','Password must be atleast 8 characters').isLength({min:8}),

  
  ],async(req,res)=>{
    let success=false;
    //if there are errors return bad request and the errors
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({success,errors:errors.array()});
  }
  //check wether the user with this email exits already
  try{
    let user=await User.findOne({email:req.body.email});
  if(user){
  return res.status(400).json({success,error:"sorry a user with this email already exist"})
  }
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt);

  //creating a new user
  user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass,
  })
  const data={
    user:{
      id:user.id
    }
  }
  const authToken=jwt.sign(data,JWT_SECRET);
   success=true;
  res.json({success,authToken})
}catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
   
})



//Route2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login',[
  body('email',' Enter a valid email as abc@gmail.com').isEmail(),
  body('password',' Password cannot be blank').exists(),

  ],async(req,res)=>{
   let success=false;
  //if there are errors return bad request and the errors
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }
  //Checking for correct email and password
  const {email,password}=req.body;
  try{

    //for correct email which exists in database
    let user=await User.findOne({email});
    if(!user)
    {
      success=false;
      return res.status(400).json({success, error:"Please try to login with correct credentials"});

    }

    //for correct password belonging to respective user
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
      success=false;
      return res.status(400).json({success, error:"Please try to login with correct credentials"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authToken})
  

  }catch(error){
    console.error(error.message);
      res.status(500).send("Internal server error occured");
  }


})



//Route3: Get loggedin User details: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
})


module.exports=router;