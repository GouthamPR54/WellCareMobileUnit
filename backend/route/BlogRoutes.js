const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const upload = require('../middleware/upload');

router.get('/getAllBlogs', blogController.getAllBlogs);
router.post('/createBlog', upload.single('image'), blogController.createBlog);
router.get('/getBlogById/:id', blogController.getBlogById);
router.put('/updateBlog/:id', blogController.updateBlog);
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;
