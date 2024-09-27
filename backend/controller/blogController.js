const Blog = require('../model/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  const { title, description, date } = req.body; // Include date in the request body
  const image = req.file.filename;

  const blog = new Blog({ title, description, image, date }); // Set date when creating a new blog

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Cannot find blog' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Cannot find blog' });
    }

    if (req.body.title != null) {
      blog.title = req.body.title;
    }
    if (req.body.description != null) {
      blog.description = req.body.description;
    }
    if (req.body.image != null) {
      blog.image = req.body.image;
    }
    if (req.body.date != null) {
      blog.date = req.body.date; // Update the date
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Cannot find blog' });
    }

    // await blog.remove();
    blog=await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted blog',blog: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

