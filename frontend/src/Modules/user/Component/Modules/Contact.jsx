import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Grid, Paper, Alert, Collapse } from '@mui/material';
import { LocationOn, Phone, AccessTime } from '@mui/icons-material';
// import Navigation from '../../../user/Component/Nav/Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import backgroundImage from '../Image/banner.jpg';
import axios from 'axios';
import config from '../config';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '30vh',
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
    borderRadius: '8px',
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

export default function Component() {
  const classes = useStyles();
  const host = config.host;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${host}/api/form/submit`, formData)
      .then(response => {
        setResponseMessage(response.data.message);
        setAlertSeverity('success');
        setAlertOpen(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(error => {
        setResponseMessage('Failed to submit the form. Please try again.');
        setAlertSeverity('error');
        setAlertOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Navigation /> */}
      <Box className={classes.root}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Contact
            </Typography>
          </Box>
        </Container>
      </Box>
      <div className="w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <Container>
            <Grid container alignItems="center" justifyContent="center" spacing={4}>
              <Grid item xs={12} lg={6}>
                <Box textAlign={{ xs: 'center', lg: 'left' }}>
                  <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                    Physiotherapy Clinic
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Our experienced team of physiotherapists are dedicated to helping you recover and improve your overall well-being. We offer a range of treatments and services to meet your individual needs.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <br></br>
                <Paper elevation={3} sx={{ p: 4, backgroundColor: '#EEEEEE' }}>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    Get in Touch
                  </Typography>
                  <Collapse in={alertOpen}>
                    <Alert
                      severity={alertSeverity}
                      onClose={() => setAlertOpen(false)}
                      sx={{ mt: 2 }}
                    >
                      {responseMessage}
                    </Alert>
                  </Collapse>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Name"
                          name="name"
                          fullWidth
                          variant="outlined"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          fullWidth
                          variant="outlined"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                      Submit
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                <Box>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    Contact Us
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn color="action" sx={{ mr: 1 }} />
                      <Typography>WellCare Mobile Unit</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Phone color="action" sx={{ mr: 1 }} />
                      <Typography>(+91) 72898821828</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <AccessTime color="action" sx={{ mr: 1 }} />
                      <Typography>Mon-Fri: 9am - 6pm, Sat: 10am - 2pm</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
      </div>
    </ThemeProvider>
  );
}
