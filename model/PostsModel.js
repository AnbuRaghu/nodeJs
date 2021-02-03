const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const PostSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,// it acts like a primarykey
        ref:'users'// it will refer collection called users in our mongoDb . in short from users it refer objectId
    },
    text:{
        type:String,
        required:true
        
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{// here we hold the users who has given the likes
                type:Schema.Types.ObjectId,
                ref:'users'
            },
        }
    ],
    comments:[
        {
            user:{// here we hold the users who has given the comments
                type:Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String

            },
            date:{
                type:Date,
                default:Date.now
            },
        }

    ],
    date:{// date of post creation
        type:Date,
        default:Date.now
    }

})
module.exports=Post=mongoose.model('post',PostSchema)