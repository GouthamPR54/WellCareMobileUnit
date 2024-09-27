import React from 'react';
import { Container, Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { Home, Phone, Email, AccessTime } from '@mui/icons-material';

const InfoBar = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 5 }}>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', py: 3, boxShadow: 3 }}>
              <CardContent>
                <Home sx={{ color: '#E91E63', fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>Visit our Location</Typography>
                <Typography variant="body2">2875 Lalbhag</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', py: 3, boxShadow: 3 }}>
              <CardContent>
                <Phone sx={{ color: '#E91E63', fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>Call us today</Typography>
                <Typography variant="body2">07969 483987</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', py: 3, boxShadow: 3 }}>
              <CardContent>
                <Email sx={{ color: '#E91E63', fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>Send us a message</Typography>
                <Typography variant="body2">WellcareMobile@gmail.com</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', py: 3, boxShadow: 3 }}>
              <CardContent>
                <AccessTime sx={{ color: '#E91E63', fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>Opening hours</Typography>
                <Typography variant="body2">Mon-Fri 7AM - 5PM</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InfoBar;
