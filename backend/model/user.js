const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,
        // unique:true,
    },
    phone:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        // required:true,
    },
    profilePicture:{
        type:String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
},{timestamps:true})

module.exports=mongoose.model('User',UserSchema)