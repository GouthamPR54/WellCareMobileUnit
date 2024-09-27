const mongoose=require('mongoose')

const productScheme=new mongoose.Schema(
    {
        pname:{
            type:String,
        },
        price:{
            type:Number,
        },
        pdiscription:{
            type:String,
        },
        rating:{
            type:Number,
        },
    }
)
module.exports=mongoose.model("product",productScheme)