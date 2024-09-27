import React, { useState, useEffect } from 'react';
import { Container, Card, Divider, CardContent, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import config from './config';
import login from '../../../user/Component/Image/b1.png';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AdminLogin = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const host = config.host;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${host}/api/admin/login`, {
        email,
        password,
      });

      // Save the token to localStorage
      localStorage.setItem('token', JSON.stringify(response.data.token));

      // Redirect to admin dashboard or any other page
      window.location.href = '/admin'; 
    } catch (err) {
      setError('Invalid email or password');
    }
  };


    return (
        <>
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundImage: `url(${login})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                filter: 'blur(8px)', 
                zIndex: -1 
            }}></div>
            <Container maxWidth="md" style={{ marginTop: '5rem', backgroundColor: '#f0f4f8', padding: '1.5rem', borderRadius: '20px' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Card style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography variant="h4" component="h2" gutterBottom>
                                    Admin Login
                                </Typography>
                                {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ marginTop: '1rem' }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ marginTop: '1rem' }}
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }} >
                                        {/* {loading ? 'Logging in...' : 'Login'} */}Login
                                    </Button>
                                    {/* <Divider style={{ margin: '16px 0' }} >OR</Divider> */}
                                    {/* <Oauth /> */}
                                </form>
                                <Typography variant="body2" component="p" style={{ marginTop: '2rem' }}>
                                    Don't have an account? <Link to="/Register">Sign Up</Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={login} alt="Login" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AdminLogin;

