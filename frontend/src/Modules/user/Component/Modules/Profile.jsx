import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Typography, Box, Link, Paper } from '@mui/material';
import config from '../config';
import { signOut } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('token')); // Assuming the token is stored in localStorage
  const host = config.host;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${host}/api/authenticate/user`, {
          headers: {
            'Auth-token': token
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.'); // Handle error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setLoading(false); // Token not found, stop loading
    }
  }, [token, host]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${host}/api/authenticate/user`, {
        headers: {
          'Auth-token': token
        }
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account.'); // Handle error
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${host}/api/authenticate/signout`, {
        method: 'POST',
        headers: {
          'Auth-token': token
        }
      });
      localStorage.removeItem('token');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>; // Loading state
  if (error) return <Typography color="error">{error}</Typography>; // Error state

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={user.profilePicture || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'}
            alt='profile'
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {user.email || 'N/A'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone: {user.phone || 'N/A'}
          </Typography>
          {/* Add more fields as necessary */}
        </Box>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Link href="/" onClick={handleDelete} color="error" sx={{ display: 'block', mb: 1 }}>
          Delete Account
        </Link>
        <Link href="/" onClick={handleLogout} color="error">
          Sign Out
        </Link>
      </Box>
    </Box>
  );
}

export default Profile;
