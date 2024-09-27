import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Paper,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import config from '../config';
import { makeStyles } from '@mui/styles';
// import Navigation from '../Nav/Navigation';
import backgroundImage from '../Image/banner.jpg';
import Footer from '../Footer';

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
    padding: theme.spacing(9),
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
  serviceItem: {
    position: 'relative',
    overflow: 'hidden',
  },
  serviceImg: {
    transition: 'transform 0.3s ease',
    borderRadius: '15px 15px 0 0',
  },
  serviceContent: {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 10px rgba(0,0,0,0.2)',
      backgroundColor: '#f0f0f0',
    },
    padding: 0,
    marginTop: theme.spacing(2), 
  },
  serviceButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: '8px', // Rounded corners for the button
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffffd0',
          borderRadius: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const Treatments = () => {
  const host = config.host;
  const { id } = useParams();
  const [treatments, setTreatments] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await Axios.get(`${host}/api/treatment/getAllTreatments/${id}`);
      setTreatments(response.data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Navigation /> */}
      <Box className={classes.root}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Services
            </Typography>
          </Box>
        </Container>
      </Box>
      <div
        style={{
          padding: '20px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: '20px', color: 'var(--bs-primary)', fontFamily: 'sans-serif' }}>
            WHAT WE DO
          </Typography>
          <Typography variant="h3" align="center" gutterBottom style={{ marginBottom: '20px', color: 'black', fontFamily: 'Georgia', marginTop: '-1%' }}>
            Our Service Given Physio Therapy By Expert
          </Typography>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {treatments.map((treatment) => (
              <Grid item xs={12} sm={6} md={4} key={treatment._id || treatment.id} className={classes.serviceItem}>
                <Paper
                  onClick={() => navigate(`/treatments/${treatment._id || treatment.id}`)}
                  className={classes.serviceContent}
                >
                  <div className="service-img rounded-top">
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${host}/api/image/${treatment.image}`}
                      alt={treatment.title}
                      className={classes.serviceImg}
                    />
                  </div>
                  <div className="service-content rounded-bottom p-4">
                    <div className="service-content-inner">
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        sx={{ fontStyle: 'Times New Roman', color: 'black', fontSize: '20px', paddingTop: '5%' }}
                      >
                        {treatment.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" style={{ marginBottom: '20px' }}>
                        {treatment.description.substring(0, 100)}...
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.serviceButton}
                        onClick={() => navigate(`/treatments/${treatment._id || treatment.id}`)}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <Footer/>
    </ThemeProvider>
  );
};

export default Treatments;
