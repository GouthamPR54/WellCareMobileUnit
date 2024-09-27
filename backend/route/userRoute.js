const express=require('express');
const router=express.Router();

const {UserInsert,GetUser,deleteUser,updateUser,GetSingleUser} = require('../controller/user_controller');

router.post('/userInsert',UserInsert);
router.get('/getUser',GetUser);
router.get('/getSingleUser/:id',GetSingleUser);
router.delete('/deleteUser/:id',deleteUser);
router.put('/updateUser/:id',updateUser);



module.exports=router;