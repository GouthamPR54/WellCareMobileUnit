import React from 'react';
import { Container, Box, Grid, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import pic3 from '../Component/Image/pic3.jpg';
import pic4 from '../Component/Image/pic4.jpg';
import pic2 from '../Component/Image/pic2.jpg';

const SpecialOffer = () => {
  return (
    <Box style={{ backgroundColor: '#fff', padding: '50px 0' }}>
      <Container>
        <Typography variant="h4" style={{ marginBottom: '30px', textAlign: 'center' }}>
          Our Special Offers
        </Typography>

        {/* "Read More" button at the top right */}
        <Box style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Button variant="contained" color="secondary"href='/Services'>
            Read More
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Physical Therapy"
                height="200"
                image={pic3}
              />
              <CardContent>
                <Typography variant="h5">Physical Therapy</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Stroke Treatment, if You’ve Just Experienced Stroke Stroke treatment simplified for you! If you just experienced a stroke, you are most likely scared and confused.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Massage Therapy"
                height="200"
                image={pic4}
              />
              <CardContent>
                <Typography variant="h5">Massage Therapy</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                These are just some of the questions that our team of physiotherapists across ReLiva Physiotherapy clinics answers frequently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Chiropractic Therapy"
                height="200"
                image={pic2}
              />
              <CardContent>
                <Typography variant="h5">Chiropractic Therapy</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Neck pain or a stiff neck is a common problem and usually nothing to worry about, except that it may be far more troubling.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SpecialOffer;
