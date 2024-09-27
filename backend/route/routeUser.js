const express = require('express');
const router = express.Router();
const { UserRegister, UserLogin, GetOneUsr, GetUser,google,signout } = require('../controller/loginregistercontroller');
const fetchAdmin = require('../middleware/fetchAdmin');

router.post('/register', UserRegister);
router.post('/login', UserLogin);

router.get('/user', fetchAdmin, GetOneUsr);
router.get('/users', fetchAdmin, GetUser);

router.post('/google', google);

router.get('/signout', signout);

router.get('/', GetUser);


module.exports = router;
