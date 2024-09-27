import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import backgroundImage from '../Component/Image/banner.jpg'; 

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60vh',
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
}));

function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.colorOverlay}></div>
      <Container>
        <Box className={classes.content}>
          <Typography variant="h2" className={classes.heading}>
            How can I help you?
          </Typography>
          <Typography variant="h4" className={classes.heading}>
            Initial Consultation: 45min 
          </Typography>
          <Typography variant="h4" className={classes.heading}>
            Follow-up Appointments: 30min 
          </Typography>
          <Typography variant="body1" className={classes.heading}>
            Currently the majority of Physiotherapy services are self-funding. If you wish to go through your health provider, please contact me first to make sure I have all the correct details to support you.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
