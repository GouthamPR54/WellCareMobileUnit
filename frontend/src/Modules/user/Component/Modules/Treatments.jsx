import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
// import Navigation from '../Nav/Navigation';
import { styled } from '@mui/material/styles';
import {
  CardMedia,
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Skeleton,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import config from '../config';
import { makeStyles } from '@mui/styles';
import backgroundImage from '../Image/background7.jpg';
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
  serviceItem: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover img': {
      transform: 'scale(1.1)',
    },
    '&:hover $serviceContent': {
      backgroundColor: '#f0f0f0',
      color: theme.palette.primary.main,
    },
  },
  serviceImg: {
    transition: 'transform 0.3s ease',
  },
  serviceContent: {
    transition: 'background-color 0.3s ease, color 0.3s ease',
    backgroundColor: '#ffffff',
  },
  serviceButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: '20px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const Treatments = () => {
  const { id } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const host = config.host;
  const classes = useStyles();

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await Axios.get(`${host}/api/treatment/getTreatment/${id}`);
        setTreatment(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching treatment:', error);
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [id, host]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 2, p: 2, background: '#f0f1f6', marginLeft: '-1%' }}>
          <Typography variant="h6">Loading...</Typography>
          <Skeleton variant="rectangular" height={350} sx={{ mb: 2 }} />
          <Skeleton variant="text" sx={{ mb: 2 }} />
          <Skeleton variant="text" sx={{ mb: 2 }} />
          <Skeleton variant="text" sx={{ mb: 2 }} />
          <Skeleton variant="text" sx={{ mb: 2 }} />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* <Navigation /> */}
      <Box className={classes.root}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Treatments
            </Typography>
          </Box>
        </Container>
      </Box>
      <StyledPaper>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          {treatment.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="290"
              image={`${host}/api/image/${treatment.image}`}
              alt={treatment.title}
              sx={{ mb: 2, width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Description:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Symptoms:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.symptoms}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Causes:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.causes}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Treatment Options:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.treatmentOptions}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Home Remedies:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.homeRemedies}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Exercises:
        </Typography>
        <Typography variant="body1" paragraph>
          {treatment.exercises}
        </Typography>
        <Typography variant="h6" gutterBottom>
          FAQs:
        </Typography>
        {treatment.faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, animation: 'slideDown 0.3s ease-in-out' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </StyledPaper>
      <Footer />
    </>
  );
};

export default Treatments;
