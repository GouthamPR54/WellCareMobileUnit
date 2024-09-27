import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
// import Navigation from '../Nav/Navigation';
import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import config from '../config';
import CloseIcon from '@mui/icons-material/Close';
import backgroundImage from '../Image/background5.jpg'
// import vdo from '../Files/video.mp4';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '45vh',
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    color: '#fff',
    padding: theme.spacing(5),
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(22, 75, 96, 0.7)',
    zIndex: 1,  
  },
  content: {
    position: 'relative',
    zIndex: 2,
    borderRadius: '8px',
    padding: theme.spacing(5),
    animation: `$fadeIn 2s ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  heading: {
    marginBottom: theme.spacing(4),
    animation: `$slideUp 1s ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes slideUp': {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    textAlign: 'left', // Ensure text aligns properly
  }
}));

const Blogs = () => {
  const classes = useStyles();
  const host = config.host;

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Axios.get(`${host}/api/blogs/getAllBlogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [host]);

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleClose = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      {/* <Navigation /> */}
      <Box className={classes.root}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Blogs
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} key={blog._id}>
              <Card onClick={() => handleCardClick(blog)}>
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {selectedBlog && (
        <Dialog
          open={!!selectedBlog}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedBlog.title}
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className={classes.dialogContent}>
            <CardMedia
              component="img"
              height="300"
              image={`${host}/api/image/${selectedBlog.image}`}
              alt={selectedBlog.title}
            />
            <Typography variant="body1" color="text.primary" sx={{ marginTop: 2 }}>
              {selectedBlog.description || selectedBlog.content} 
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              {new Date(selectedBlog.date).toLocaleDateString()} - {selectedBlog.status}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Blogs;
