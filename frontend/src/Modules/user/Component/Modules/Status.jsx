import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Alert, Card, CardContent, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {jwtDecode} from 'jwt-decode';
import config from '../config';
import backgroundImage from '../Image/b1.png';

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
  card: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusButton: {
    margin: theme.spacing(0.5),
    '&.Approved': {
      color: theme.palette.success.main,
    },
    '&.Canceled': {
      color: theme.palette.error.main,
    },
    '&.Unapproved': {
      color: theme.palette.text.primary,
    },
  },
  bookingDetails: {
    flex: 1,
    paddingRight: theme.spacing(2),
  },
  additionalInfo: {
    flex: 1,
  },
}));

const statusColors = {
  Canceled: 'error',
  Approved: 'success',
  Unapproved: 'default',
};

const Status = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState(null);
  const classes = useStyles();
  const host = config.host;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No authentication token found.');
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get(`${host}/api/booking/bookings`, {
        params: { userId },
        headers: { 'Auth-token': token },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No authentication token found.');
      }

      await axios.patch(`${host}/api/booking/bookings/${id}/${status}`, {}, {
        headers: {
          'Auth-token': token
        }
      });
      setMessage(`Booking ${id} has been ${status}`);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Error updating booking status', error);
      alert('Failed to update booking status');
    }
  };

  return (
    <Container>
      <Box className={classes.root}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Your Bookings
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={{ my: 4 }}>
        {message && <Alert severity="info">{message}</Alert>}
        <Grid container spacing={2}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} md={6} key={booking._id}>
              <Card className={classes.card}>
              <Typography variant="h6" sx={{paddingLeft:'20px',paddingTop:'10px'}}>Booking {index + 1}</Typography>
                <CardContent className={classes.cardContent}>
                  <Box className={classes.bookingDetails}>
                    
                    <Typography>Service: {booking.service}</Typography>
                    <Typography>ID: {booking._id}</Typography>
                    <Typography>Email: {booking.email}</Typography>
                    <Typography>Date: {new Date(booking.date).toLocaleDateString()}</Typography>
                    <Typography>Time Slot: {booking.timeSlot}</Typography>
                  </Box>
                  <Box className={classes.additionalInfo}>
                    <Typography>Phone: {booking.phone}</Typography>
                    <Typography>Location: {booking.location}</Typography>
                    <Typography>Address: {booking.address}</Typography>
                    <Typography>Pin Code: {booking.pinCode}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    className={`${classes.statusButton} ${booking.status}`}
                    onClick={() => updateBookingStatus(booking._id, booking.status)}
                  >
                    {booking.status}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Status;
