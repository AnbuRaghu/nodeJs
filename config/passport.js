// it is customized stuff for implementation
//strategy we want to apply is =>jwt
//get the passport-jwt strategy
const jwtStrategy=require('passport-jwt').Strategy

// do we need to extract the token
const extractJwt=require('passport-jwt').ExtractJwt

//in token there are following properties
//id(it's a unique thing and will help to get record faster) to validate id specification we nees user model & mongoose
//name
//email
const mongoose=require('mongoose')
const User=mongoose.Model('users')

//we need to decode the token => it will b done internally by the middleware but we need to provide the secret key
//how can I bring secret key
const secretKey=require('../config/config').secretOrKey

const options={}// this empty json is used to provide some details like token and secret key in terms of json obj
options.secretOrKey=secretKey;
options.jwtFromRequest=extractJwt.fromAuthHeaderAsBearerToken()

module.exports=passport=>{
    passport.use(new jwtStrategy(options,(jwt_payload,done)=>{

        // can we check that here User is existing or not based on id?
        User.findById(jwt_payload.id).then((user)=>{// findById is predefined
            if(user){
                return done(null,user)// null is for we dont get error that's y we assigned null done callback takes 2 params 1st one kis error 2nd data
            }else{
                return done(null,false)// here no err but the particular user record does not available

            }
        }
        ).catch((err)=>console.log(err))
    }))

     //jwt_payload consists of token,id ,email
}