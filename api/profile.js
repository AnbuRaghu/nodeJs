// all users related work will be routed to users.js
// here we need to take a router object
// but to get the router object we need to an express module?
const express = require("express");
const validateProfileInput=require('../api/validations/profile')
const validateExperienceInput=require('../api/validations/experience')
const passport =require('passport')
const profile=require('../model/ProfileModel');
const { default: validator } = require("validator");


const router = express.Router();
// we rcvd router object

// @route GET api/users/test
// @Desc tests the users route
// @access public

router.get("/test", (req, res) => {
  res.json({ msg: "hello from profile" });
});
// create profile
//do we need to to confirm the token
router.post('/',passport.authenticate("jwt",{session:false}),(req,res)=>{
  // validate the data
  const{error,isValid}=validateProfileInput(req.body);
  
  if(!isValid){
    return res.status(400).json(error)
  }
  // get fields
  const profileFields={}
  profileFields.user=req.user.id;
  if(req.body.handle)profileFields.handle=req.body.handle;
  if(req.body.company)profileFields.company=req.body.company;
  if(req.body.website)profileField.website=req.body.website;
  if(req.body.location)profileFields.location=req.body.location;
  if(req.body.bio)profileFields.bio=req.body.bio;
  if(req.body.status)profileFields.status=req.body.status;
  if(req.body.githubusername)profileFields.githubusername=req.body.githubusername;

  // skills in a String seperated by comma ==> need to collect them in an array
  if(typeof req.body.skills !== 'undefined'){
    profileFields.skills=req.body.skills.split(",")// we use this to add comma in an array
  }


  // social
profileFields.social={}
if(req.body.youtube)profileFields.youtube=req.body.youtube;
  if(req.body.twitter)profileField.twitter=req.body.twitter;
  if(req.body.facebook)profileFields.facebook=req.body.facebook;
  if(req.body.linkedin)profileFields.linkedin=req.body.linkedin;
  if(req.body.instagram)profileFields.instagram=req.body.instagram;

  // the profile must be create for the existing User means registerd user==> so we need to impor th eprofile model

  profile.findOne({user:req.user.id}).then(profile=>{
    if(profile){//if profile existe ,we update
      profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new :true}).then(profile=>{
        res.json(profile)
        // here new:true means it returns the updated values
      })

    }else{ 
      profile.findOne({handle:profileFields.handle}).then(profile =>{
        if(profile){
          error.handle='that profile exists already'
          res.status(400).json(error)
        }
      })
      // else part
      new profile(profileFields).save().then((profile)=>{
        res.json(profile)

      })
    }
      
     
   
    
})

  //  check if user is exist or not
  // if user exist  then we come acrros 2 things as below
  //profile exists then update
  //if profile not exists create a new one 


})
//update
//get

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const error={}
  profile.findOne({user:req.user.id}).populate('user',['name','email']).then(profile =>{
    if(!profile){
      error.noProfile='There is no profile for this user'
      return res.status(404).json(error)
    }
    res.json(profile)
  }).catch(err=>{res.status(404).json(err)})
  //populate method is used to specify your projection list for example select 

})
//getall
// here we removd passport jwt authentication

router.get('/all',(req,res)=>{
  const error={}
  profile.find().populate('user',['name','email']).then(profile =>{
    if(!profile){
      error.noProfile='There is no profile for this user'
      return res.status(404).json(error)
    }
    res.json(profile)
  }).catch(err=>{res.status(404).json(err)})
  

})




//based on the handle retrieve the record
router.get('/handle:handle',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const error={}
  profile.findOne({handle:req.params.handle}).populate('user',['name','email']).then(profile =>{
    if(!profile){
      error.noProfile='There is no profile for this user'
      return res.status(404).json(error)
    }
    res.json(profile)
  }).catch(err=>{res.status(404).json(err)})
 

})

//@route get api/profile/user/:user_id


//delete

  
//add experience
//@route post api/profile/experience
//@desc:add experience to profile
//@access Private

router.post('/experience',passport.authenticate('jwt',{session:false},(req,res)=>{
  const {error,isValid}=validateExperienceInput(req.body)
  if(!isValid){
    return res.status(400).json(error)
  }
  profile.findOne({user:req.user.id}).then(profile=>{
    // we collect the data
    const newExpe={
      title:req.body.title,
      company:req.body.company,
      location:req.body.location,
      from:req.body.from,
      to:req.body.to,
      current:req.body.current,
      description:req.body.description,

    }
    //add experience to array
    //unshift() inserts new elements at the start of an Array
    //here with the help of unshift () experience will be added from latest to old experience
    profile.experience.unshift(newExpe)
    profile.save().then((profile =>res.json(profile)))
  })
}))

//delete experience

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false},(req,res)=>{
  profile.findOne({user:req.user.id}).then(profile=>{
    const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params .exp_id)//as experience is an array internally so we map through it
    
    profile.experience.splice(removeIndex,1)
    profile.save().then(profile=>{// it s like an update after deleting we save the aktuell array
      res.json(profile)
    })
  })
}))
//add education
// delete education


module.exports = router;
