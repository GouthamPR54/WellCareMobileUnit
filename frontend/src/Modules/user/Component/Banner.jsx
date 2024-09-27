import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Banner1 from '../Component/Image/banner1.png';
import Banner2 from '../Component/Image/banner2.jpg';
import Banner3 from '../Component/Image/banner3.jpeg';
import Banner4 from '../Component/Image/banner4.jpeg';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  text: {
    animation: `$fadeInUp 1s ease-in-out`,
  },
}));

const HeroSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={5.5}>
              <img
                src={Banner1}
                alt="Exercise"
                className={classes.image}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={Banner2}
                alt="Running"
                className={classes.image}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={Banner3}
                alt="Foot"
                className={classes.image}
              />
            </Grid>
            <Grid item xs={5}>
              <img
                src={Banner4}
                alt="Physio"
                className={classes.image}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5.5} sx={{ marginTop: '8%' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: "Nunito", fontWeight: '550' }} className={classes.text}>
            Physiotherapy Services
          </Typography>
          <Typography variant="body1" paragraph className={classes.text}>
            Expert assessment and treatment can be offered to all, from elite athlete to office workers and schoolchildren. Give your body the care and attention it deserves. Having years of experience gaining a wide breadth of knowledge and excellent communication skills to you informed whilst aiding you.
          </Typography>
          <Button variant="contained" color="primary" sx={{backgroundColor:'rgb(220, 0, 78)'}}className={`${classes.button} ${classes.text}`}>
            Read More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
