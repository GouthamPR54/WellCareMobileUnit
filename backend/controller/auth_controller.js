 const userSchema = require('../model/user');
 
 exports.google =async (req, res, next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user.id}, {secret:user.secret})
            const{password :hashedPassword,...rest}=user._doc;
            const expiryDate = new Date(Date.now()+ 3600000); 

            res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10); 
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                profilePicture:req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({id:newUser.id}, {secret:newUser.secret})
            const{password :hashedPassword2,...rest}=newUser._doc;
            const expiryDate = new Date(Date.now()+ 3600000);
            res.cookie('access_token',token,{httpOnly:true,expires:expiryDate});
    }
}catch(error){
    next(error)
    }
}