import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#265f8d', 
    padding: theme.spacing(6, 0),
    color: '#FFFFFF', 
  },
  container: {
    maxWidth: 'lg',
  },
  section: {
    marginBottom: theme.spacing(10),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  item: {
    marginBottom: theme.spacing(1),
  },
  bottomText: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
    borderTop: '1px solid #FFFFFF',
    paddingTop: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.section}>
              About Me
            </Typography>
            <Typography variant="body1">
            WellCare Mobile Unit is India's fastest growing Delivery Network for Physiotherapy & Chiropractors services. 
          At WellCare Mobile Unit, we are committed to increasing access to quality physio care through ultra-modern clinics and high-skilled practitioners. 
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.section}>
              Business Hours
            </Typography>
            <Typography variant="body1" className={classes.item}>
              Monday - Friday: 8:30 AM - 5:30 PM
            </Typography>
            <Typography variant="body1" className={classes.item}>
              Saturday: 8:00 AM - 11:00 AM
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.section}>
              Get In Touch!
            </Typography>
            <Typography variant="body1" className={classes.item}>
              <span className={classes.icon}>📞</span> 07969 483987
            </Typography>
            <Typography variant="body1" className={classes.item}>
              <span className={classes.icon}>📍</span> Mangalore
            </Typography>
            <Typography variant="body1" className={classes.item}>
              <span className={classes.icon}>✉️</span> wellcareMobile@gmail.com
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className={classes.bottomText}>
          © 2024 Physio Therapies. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
