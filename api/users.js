// all users related work will be routed to users.js
// here we need to take a router object
// but to get the router object we need to an express module?
const express = require("express");
const{json}=require('body-parser')
const jwt=require('jsonwebtoken')

const router = express.Router();
const validateRegisterInput=require('./validations/register')
const validateLoginInput=require('./validations/login')
const bcrypt=require('bcrypt')
const  secretOrKey=require('../config/config').secretOrKey
const passport =require('passport')

// when we will collect the data in our router with post
// method then that data should be stored to the DB.

const User = require("../model/UserModel");
// we rcvd router object

// @route GET api/users/test
// @Desc tests the users route
// @access public

router.get("/test", (req, res) => {
  res.json({ msg: "hello from users" });
});

// register user
// this post method should bring the data from client using
// request objectmongod


router.post("/register", (req, res) => {

  // validate data
  const {error,isValid}=validateRegisterInput(req.body)
  if(!isValid){
    return res.status(400).json(error)
  }
  //check if email is already exissting or not
  res.json(req.body)

  const newUser=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.passsword
  })
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
      if(err) throw err;
      newUser.password=hash;

      newUser.save().then(user=>res.json(user)).catch(err =>res.json(err))// save method is must to save these data int db
    })
  })
 
  console.log(JSON.stringify(newUser))

  
  console.log("user register called successfully");
  res.json({ msg: "user registered successfully" });
});
// login user
router.post('/login',(req,res)=>{
 //validation
 const{error,isValid}=validateLoginInput(req.body);
 //check validations
 if(!isValid){
   return res.status(400).json(error)
 }
 //login check with mongoDb
const email=req.body.email;
const pwd=req.body.password
 User.findOne({email}).then(user =>{//here User is mongoose model this mongoose model refer the Db
   if(!User){
     error.email='User not found'
     return res.status(400).json(error)
   }//we checked the email
   // it's time to check pwd
   //pwd is encrypt using bycrypt
   //1.decrypt the pwd and compare
   //2 compare both in as it is way==> db pasword will be in encrypted format and our provided pwd will be in normal english content
   bcrypt.compare(pwd,user.password).then(isMatch =>{
     if(isMatch){
        //generete the token==>JWT
        //payload data
        const payload={id:user._id,
        name:user.name,
        email:user.email
      }
       // jwt.sign(payload,secretOrKey,expiry,callback)//method signature
       jwt.sign(payload,secretOrKey,{expiresIn:3600},(err,token)=>{
         //share the token with the client
         res.json(
           {
             success:true,
             token:"Bearer "+ token,
           }
         )
       })
        //do we need a library to generete the token? Jssonwebtoken
      return  res.json(user)
     }else{
       error.password='password is incorrect'
       return res.status(400).json(error)
     }
   })
 })

 
})

// get current user details
//@Route GET api/users/current
//@desc :returns the current user details
//@access:private( private means it requires a token only then it should be accessible)
// to get this /current rout e we check authentication of passport
//router.get('/current',(req,res)=>{
  //in this get() we will get one more param where we provide authenticaton specification
  router.get('/current',passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.json('current is working')
})

module.exports = router;
