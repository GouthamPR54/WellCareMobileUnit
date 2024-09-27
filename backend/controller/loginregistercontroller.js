const userSchema = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs'); 
const key = "Hello"; 

const UserRegister = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);
        const Register = new userSchema({ name, email, phone, password: secpass });
        const Registered = await Register.save();
        res.json(Registered);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

const UserLogin = async (req, res) => {
    try {
        const { email, password, photoURL } = req.body; 
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        if (photoURL && user.profilePicture !== photoURL) {
            user.profilePicture = photoURL;
            await user.save();
        }

        const data = { id: user._id }; 
        const token = await jwt.sign(data, key);
        res.json({ token, success: true, profilePicture: user.profilePicture });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

const GetOneUsr = async (req, res) => {
    try {
        const ViewSingle = await userSchema.findById(req.user.id); 
        res.json(ViewSingle);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
};

const GetUser = async (req, res) => {
    try {
        const users = await userSchema.find();
        res.json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
};

const google = async (req, res, next) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, key); // Ensure using the correct key
            const { password, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); 

            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); 
            const newUser = new userSchema({
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photoURL,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, key); 
            const { password, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

const signout = (req, res) => {
res.clearCookie('access_token').status(200).json('signout sccess!')
}


module.exports = { UserRegister, UserLogin, GetOneUsr, GetUser, google ,signout };
