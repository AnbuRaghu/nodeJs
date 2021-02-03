// all users related work will be routed to users.js
// here we need to take a router object
// but to get the router object we need to an express module?
const express = require("express");

const router = express.Router();
const mongoose = require('mongoose')
const passport=require('passport')

//post model
const post =require('../model/PostsModel')
//profile model
const Profile=require('../model/ProfileModel')
//validation
const validatePostInput=require('./validations/post')
// we rcvd router object

// @route GET api/users/test
// @Desc tests the users route
// @access public

router.get("/test", (req, res) => {
  res.json({ msg: "hello from posts" });
});

//@route GET api/posts
//@desc get post
//@access public
router.get('/',(req,res)=>{
  post.find()
  .sort({date:-1})// -1 is considered as descending order
  .then(posts=>{
    res.json(posts).catch(err=>{
      res.status(404).json({noPostFound:'No Post Found '})
    })
  })
})

//@route GET api/posts/:id
//@desc get post by id
//@access public
router.get('/:id',(req,res)=>{
  post.findById(req.params.id).then(post=>{
    res.json(post)
  }).catch(err=>{
    res.status(404).json({noPostFound:'No Post Found with that Id'})
  })
})
//@route POST api/posts
//@desc create post 
//@access private
router.post('/',passport.authenticate('jwt',{session:false},(req,res)=>{
  const {error,isValid}=validatePostInput(req.body)

  // check validatin
  if(!isValid){
    //if any error send 400 with error Object
    return res.status(400).json(error)
  }
  const newPost=new post({
    text:req.body.text,
    name:req.body.name,
    avatar:req.body.avatar,
    user:req.user.id
  })
  newPost.save().then(post=>{
    res.json(post)
  })
}))

//@route DELETE api/posts/:id
//@desc delete post 
//@access private
router.delete('/:id',passport.authenticate('jwt',{session:false},(req,res)=>{
  Profile.findOne({user:req.user.id}).then(profile=>{
    post.findById(req.params.id).then(post=>{
      // check for post owner
      if(post.user.toString() !== req.user.id){
        return res.status(401).json({notauthorized:'User not authorized'})
      }

      //delete
      post.remove().then(()=>{
        res.json({success:true})
      }).catch(err=>{
        res.status(404).json({postnotfound: 'No post Found'})
      })
    })
  })
}))

//@route POST api/posts/like/:id
//@desc like post 
//@access private

router.post('/like/:id',passport.authenticate('jwt',{session:false},(req,res)=>{
  Profile.findOne({user:req.user.id}).then(profile=>{
    post.findById(req.params.id).then(post=>{
      if(
        post.likes.filter(like=>like.user.toString()=== req.user.id).length>0

      ){
        return res.status(400).json({alreadyliked:'User already liked this post'})
      }
      //add user id to likes array
      post.likes.unshift({user:req.user.id})

      post.save().then(post=>res.json(post))
    }).catch(err=>{
      res.status(404).json({postnotFound:'No post found'})
    })
  })
}))
//@route POST api/posts/unlike/:id
//@desc unlike post 
//@access private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false},(req,res)=>{
  Profile.findOne({user:req.user.id}).then(profile=>{
    post.findById(req.params.id).then(post=>{
      if(post.likes.filter(like=> like.user.toString()=== req.user.id).length===0){
        return res.status(400).json({notLiked:'u have not yet liked'})
      }
      // get remove indeex
      const removeindex=post.likes.map(item=>item.user.toString()).indexOf(req.user.id)

      //splice out of array
      post.likes.splice(removeindex,1)
      // save
      post.save().then(post=>res.json(post)).catch(err=>{res.status(404).json({postNotfound:'No Post Found'})})
    })
  })
}))



module.exports = router;
