const mongoose=require('mongoose')

const URI="mongodb+srv://goutham:goutham@goutham.nmc9u.mongodb.net/"

const dbConnection=async()=>{
    try{
        await mongoose.connect(URI)
        console.log("Database connection succesfull")
    }catch(err){
        console.log(err)
    }
}
module.exports=dbConnection;