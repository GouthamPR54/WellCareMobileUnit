const express=require('express');
const router=express.Router();

const ProductInsert = require('../controller/product_controller');
router.post('/productInsert',ProductInsert);

module.exports=router;