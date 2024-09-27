import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Grid, Alert, Snackbar, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Email, Lock } from '@mui/icons-material';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import config from './config';
import { signInStart, signInSuccess, signInFailurre, clearError } from '../Component/Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import login from '../Component/Image/login.jpg';

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

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // State for success message
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const host = config.host;

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Enter a valid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) return;

        try {
            dispatch(signInStart());
            const response = await Axios.post(`${host}/api/authenticate/login`, { email, password });
            if (response.data.success) {
                dispatch(signInSuccess(response.data));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                setSuccessMessage(true); // Show success message
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Redirect after 2 seconds
            } else {
                dispatch(signInFailurre(response.data.message));
            }
        } catch (err) {
            dispatch(signInFailurre('Wrong credentials'));
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
                                    Login
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
                                        error={!!emailError}
                                        helperText={emailError}
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
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ marginTop: '1rem' }}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }} disabled={loading}>
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
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

            {/* Success Snackbar */}
            <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
                <Alert onClose={() => setSuccessMessage(false)} severity="success">
                    Login Successful!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;
