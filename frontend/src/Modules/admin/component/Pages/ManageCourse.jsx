import { Container, Grid, Box, Typography, Button, TextField, Card, CardContent, CardMedia } from '@mui/material'
import { styled } from '@mui/system'
import pic1 from '../Image/pic1.png';
import pic2 from '../Image/pic2.jpg';
import axios from 'axios';
import { useState } from 'react';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}))

const StyledHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(12, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(16, 0),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(20, 0),
  },
}))

export default function ManageCourse() {

  const [formData, setFormData] = useState({

  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('image', formData.image);

    try {
      const res = await axios.post('http://localhost:5000/api/blogpost/BlogPostInsert', form, { // Updated URL with http://
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Blog post added:', res.data);
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  return (
    <StyledContainer sx={{ marginTop: '2%' }}>
      <StyledHeader>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h3" component="h1" color="primary.contrastText" fontWeight="bold" gutterBottom>
              Physiotherapy Blog
            </Typography>
            <Typography variant="h6" color="primary.contrastText" opacity={0.8} paragraph>
              Discover the latest insights and tips from our expert physiotherapists.
            </Typography>
            <Button variant="contained" color="primary" size="large" href="#">
              Read More
            </Button>
          </Box>
        </Container>
      </StyledHeader>
      <Box flex={1}>
        <Box py={{ xs: 12, md: 16, lg: 20 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Add New Blog Post
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                      <Box mb={2}>
                        <Typography variant="subtitle1" component="label" htmlFor="image" display="block" mb={1}>
                          Image or Video
                        </Typography>
                        <TextField type="file" id="image" fullWidth variant="outlined" onChange={handleFileChange} />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle1" component="label" htmlFor="title" display="block" mb={1}>
                          Title
                        </Typography>
                        <TextField id="title" fullWidth variant="outlined" value={formData.title || ""} onChange={handleChange} />
                      </Box>
                      <Box mb={2}>
                        <Typography variant="subtitle1" component="label" htmlFor="description" display="block" mb={1}>
                          Description
                        </Typography>
                        <TextField id="description" multiline rows={3} fullWidth variant="outlined" value={formData.description || ""} onChange={handleChange} />
                      </Box>
                      <Button variant="contained" color="primary" type="submit">
                        Add Blog Post
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              {[
                {
                  title: 'Improving Posture for Better Mobility',
                  description:
                    'Discover simple exercises and tips to improve your posture and enhance your overall mobility. Our experts share their insights on this important aspect of physiotherapy.',
                },
                {
                  title: 'Effective Stretching Techniques for Pain Relief',
                  description:
                    'Explore our expert-recommended stretching techniques to alleviate pain and improve flexibility. Learn how to incorporate these exercises into your daily routine for long-lasting relief.',
                },
                {
                  title: 'Recovering from Sports Injuries: A Guide',
                  description:
                    'Injured from your favorite sport? Our physiotherapists share their expertise on the best recovery strategies to get you back on the field or court as soon as possible.',
                },
              ].map((post, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={pic1}
                      alt="Blog Post Image"
                      height="200"
                    />
                    <CardContent>
                      <Typography variant="h6" component="h3">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {post.description}
                      </Typography>
                      <Button variant="text" color="primary" endIcon={<ArrowRightIcon />}>
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box py={{ xs: 12, md: 16, lg: 20 }} bgcolor="grey.100">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" gutterBottom>
                Categories
              </Typography>
              {['Injury Prevention', 'Rehabilitation', 'Mobility and Flexibility', 'Sports Physiotherapy'].map(
                (category, index) => (
                  <Box mb={1} key={index}>
                    {category}
                  </Box>
                )
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" gutterBottom>
                Popular Posts
              </Typography>
              {[
                {
                  title: 'Improving Posture for Better Mobility',
                  description: 'Discover simple exercises and tips to improve your posture and enhance your overall mobility.',
                },
                {
                  title: 'Effective Stretching Techniques for Pain Relief',
                  description: 'Explore our expert-recommended stretching techniques to alleviate pain and improve flexibility.',
                },
                {
                  title: 'Recovering from Sports Injuries: A Guide',
                  description: 'Our physiotherapists share their expertise on the best recovery strategies to get you back on the field or court.',
                },
              ].map((post, index) => (
                <Box display="flex" mb={2} key={index}>
                  <Box mr={2}>
                    <CardMedia
                      component="img"
                      image={pic2}
                      alt="Blog Post Image"
                      width="80"
                      height="80"
                      style={{ borderRadius: 8 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" component="h3">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Our physiotherapy practice is dedicated to helping individuals achieve their optimal physical health and well-being. Our team of experienced professionals provides personalized care and evidence-based treatments to address a wide range of musculoskeletal conditions.
              </Typography>
              <Button variant="text" color="primary" href="#" endIcon={<ArrowRightIcon />}>
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={6} bgcolor="grey.100">
        <Container maxWidth="lg" display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 Physiotherapy Practice. All rights reserved.
          </Typography>
          <Box display="flex" gap={2}>
            Privacy Policy
            Terms of Service
          </Box>
        </Container>
      </Box>
    </StyledContainer>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
