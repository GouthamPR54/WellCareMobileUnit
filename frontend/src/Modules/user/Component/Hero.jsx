import { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import background1 from '../Component/Image/background1.jpg';
import background2 from '../Component/Image/b1.png';
import background3 from '../Component/Image/background.jpg';

const useStyles = makeStyles((theme) => ({
    section: {
      width: '100%',
      height: '75vh',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative',
      transition: 'background-image 1s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
        zIndex: 1,
      },
    },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:'3%',
    textAlign: 'center',
    color:'#FFFFFF',
    gap: theme.spacing(4),
    animation: '$fadeIn 1s',
    zIndex:2,
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  buttonWrapper: {
    animation: '$slideUp 6s',
  },
  '@keyframes slideUp': {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: theme.spacing(1),
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
  leftButton: {
    left: theme.spacing(-80),
    top: theme.spacing(-14),
  },
  rightButton: {
    right: theme.spacing(-80),
    top: theme.spacing(-14),
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const backgroundImages = [background1, background2, background3];

export default function Component() {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  return (
    <section
      className={classes.section}
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
    >
      <Container className={classes.container}>
        <Typography variant="h3" component="h1" fontWeight="bold" >
          Unlock Your Full Potential with Our Physiotherapy Expertise
        </Typography>
        <Typography variant="h6" maxWidth="700px" marginLeft="20%" >
          Experience personalized care and cutting-edge treatments to help you achieve your health and wellness goals.
        </Typography>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '45px',
              marginTop:'1%',
              px: 4,
              textTransform: 'none',
              backgroundColor:'rgb(220, 0, 78)'
            }}
          >
            Book an Appointment
          </Button>
        </div>
        <Button className={`${classes.navButton} ${classes.leftButton}`} onClick={handlePrevImage}>
        <ChevronLeft className={classes.icon} />
      </Button>
      <Button className={`${classes.navButton} ${classes.rightButton}`} onClick={handleNextImage}>
        <ChevronRight className={classes.icon} />
      </Button>
      </Container>
    </section>
  );
}
