import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';
import { Email, Lock, Person, Phone } from '@mui/icons-material';
import Axios from 'axios';
import config from './config';
import { Link } from 'react-router-dom';
import login from '../Component/Image/login.jpg';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const host = config.host;

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = firstName ? "" : "First name is required.";
    tempErrors.lastName = lastName ? "" : "Last name is required.";
    tempErrors.email = (/^$|.+@.+..+/).test(email) ? "" : "Email is not valid.";
    tempErrors.phone = phone ? "" : "Phone number is required.";
    tempErrors.password = password.length > 5 ? "" : "Password must be at least 6 characters long.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const name = `${firstName} ${lastName}`;
      try {
        const response = await Axios.post(`${host}/api/authenticate/register`, { name, email, phone, password });
        if (response.data._id) {
          alert("User Registered Successfully");
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhone('');
          setPassword('');
          setErrors({});
        } else if (response.data.error === "Email already exists") {
          alert("Email already exists");
        } else {
          alert("Failed to Register User");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to Register User");
      }
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
                  Sign up now
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First name"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last name"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    style={{ marginTop: '1rem' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    type="text"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                    style={{ marginTop: '1rem' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    style={{ marginTop: '1rem' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                    Sign Up
                  </Button>
                  {/* <Divider style={{ margin: '16px 0' }} >OR</Divider> */}
                  {/* <Oauth/> */}
                </form>
                <Typography variant="body2" component="p" style={{ marginTop: '2rem' }}>
                  Already have an account? <Link to="/Login">Login</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={login} alt="Sign Up" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Register;
