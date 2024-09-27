const userScheme=require('../model/user_model')

const UserInsert=async(req,res)=>{
    try{
        console.log(req.body);
        const {username,email,phone,address,age}=req.body;

        const UserInfo=new userScheme({username,email,phone,address,age});
        const userSaved=await UserInfo.save();
        res.send(userSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error accured");

    }
}


const GetUser=async(req,res)=>{
    try{
        const user=await userScheme.find();
        res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error accured");
    }
}

const GetSingleUser=async(req,res)=>{
    try{
        const user=await userScheme.findById(req.params.id);
        res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error accured");
    }
}

const deleteUser = async (req,res)=>{
    try{
        let user = await userScheme.findById(req.params.id);
        if(!user){
            return res.status(404).send("not found");
        }
        user = await userScheme.findByIdAndDelete(req.params.id)
        res.json({"success":"Product deleted successfully",user:user});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal some error auccured");
    }
}

const updateUser = async (req,res)=>{
    const {username,email,phone,address,age}=req.body;
    try{
        const newUser={};
        if(username) { newUser.username = username};
        if(email) { newUser.email = email};
        if(phone) { newUser.phone = phone};
        if(address) { newUser.address = address};
        if(age) { newUser.age = age};

        let user = await userScheme.findById(req.params.id);
        if(!user){
            return res.status(404).send("not Found");
        }
        user = await userScheme.findByIdAndUpdate(req.params.id,{
            $set: newUser },{new: true})
            res.json({user})
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internet some error auccord");

        }
    }

module.exports={UserInsert,GetUser,deleteUser,updateUser,GetSingleUser};