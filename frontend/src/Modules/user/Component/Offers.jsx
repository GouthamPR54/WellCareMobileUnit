import React from 'react';
import { Container, Box, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import pic1 from '../Component/Image/p1.jpg'; // Add your images to the src/assets folder
import pic2 from '../Component/Image/p2.jpg';
import pic3 from '../Component/Image/p3.jpg';

const Offers = () => {
  return (
    <Box style={{ backgroundColor: '#f9f9f9', padding: '50px 0' }}>
      <Container>
        <Typography variant="h4" style={{ marginBottom: '30px', textAlign: 'center' }}>
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Physical Therapy"
                height="200"
                image={pic1}
              />
              <CardContent>
                <Typography variant="h5">CLINIC TREATMENTS</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                High quality physiotherapy care at our CB Physiotherapy Centre near you. Best Treatment for Ortho / Neuro Issues
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
                <Typography variant="h5">PHYSIO HOME VISITS</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Home Visits by certified CB Physiotherapists for Patients with mobility issues & for patients looking for convenience
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
                image={pic3}
              />
              <CardContent>
                <Typography variant="h5">Physiotherapists</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                With expertise, our Clinics are equipped with latest approved technologies
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Offers;
