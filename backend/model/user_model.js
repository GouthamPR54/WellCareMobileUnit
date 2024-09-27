const mongoose=require('mongoose')

const userScheme=new mongoose.Schema(
    {
        username:{
            type:String,
        },
        email:{
            type:String,
        },
        age:{
            type:Number,
        },
        address:{
            type:String,
        }
        
    }
)
module.exports=mongoose.model("user",userScheme)

