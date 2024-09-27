const Admin = require('../model/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = "Hello"; 


// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(401).json({ msg: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(401).json({ msg: 'Invalid email or password' });
//     }

//     const payload = {
//       admin: {
//         id: admin.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };




const loginAdmin = async (req, res) => {
  try {
      const { email, password} = req.body; 
      const user = await Admin.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: 'Incorrect email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Incorrect password' });
      }

      // if (photoURL && user.profilePicture !== photoURL) {
      //     user.profilePicture = photoURL;
      //     await user.save();
      // }

      const data = { id: user._id }; 
      const token = await jwt.sign(data, key);
      res.json({ token, success: true});
  } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
  }
};

module.exports = { loginAdmin };
