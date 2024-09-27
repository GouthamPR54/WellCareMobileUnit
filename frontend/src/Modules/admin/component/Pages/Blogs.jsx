import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import config from '../Pages/config';
import background1 from '../Image/background1.jpeg';

const initialBlogs = [
  // initial blog data
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Blogs = () => {
  const host = config.host;
  const [blogs, setBlogs] = useState(initialBlogs);
  const [open, setOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await Axios.get(`${host}/api/blogs/getAllBlogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleAddBlog = () => {
    setCurrentBlog(null);
    setOpen(true);
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setOpen(true);
  };

  const handleDelete = async (blogId) => {
    try {
      await Axios.delete(`${host}/api/blogs/deleteBlog/${blogId}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveBlog = async (blog, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('description', blog.description);
      formData.append('image', imageFile);

      await Axios.post(`${host}/api/blogs/createBlog`, formData)
        .then((response) => {
          setBlogs((prevBlogs) => [...prevBlogs, response.data]);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });

      handleClose();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleShare = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: `${window.location.origin}/blog/${blog._id}`,
      })
      .then(() => console.log('Blog shared successfully'))
      .catch((error) => console.error('Error sharing blog:', error));
    } else {
      alert('Share functionality is not supported in your browser.');
    }
  };

  const BlogForm = ({ blog, onSave }) => {
    const [title, setTitle] = useState(blog ? blog.title : '');
    const [description, setDescription] = useState(blog ? blog.description : '');
    const [date, setDate] = useState(blog ? blog.date : new Date().toISOString().split('T')[0]); // Initialize date
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(blog ? blog.image : null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const savedBlog = {
        ...blog,
        title,
        description,
        date,
      };
      onSave(savedBlog, imageFile);
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextareaAutosize
            rowsMin={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            required
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <div>
            {previewImage && (
              <CardMedia
                component="img"
                height="200"
                image={previewImage}
                alt="Preview"
                style={{ marginBottom: '10px' }}
              />
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" color="primary">
                Upload Image
              </Button>
            </label>
          </div>
          <Button variant="contained" type="submit" color="primary" size="medium">
            Save
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <div style={{ padding: '20px', backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom style={{ marginBottom: '20px', color: '#333' }}>
        Physiotherapy Blog
      </Typography>
      <Button variant="contained" color="success" onClick={handleAddBlog}>
        Upload Blog
      </Button>
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} key={blog._id || blog.id || index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`${host}/api/image/${blog.image}`}
                alt={blog.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(blog.date).toLocaleDateString()} - {blog.status}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="edit" onClick={() => handleEditBlog(blog)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(blog._id)}>
                  <DeleteIcon />
                </IconButton>
                {/* <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton> */}
                <IconButton aria-label="share" onClick={() => handleShare(blog)}>
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded === (blog._id || blog.id)}
                  onClick={() => handleExpandClick(blog._id || blog.id)}
                  aria-expanded={expanded === (blog._id || blog.id)}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded === (blog._id || blog.id)} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    {blog.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{currentBlog ? 'Edit blog' : 'Add blog'}</DialogTitle>
        <DialogContent dividers>
          <BlogForm blog={currentBlog} onSave={handleSaveBlog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blogs;
