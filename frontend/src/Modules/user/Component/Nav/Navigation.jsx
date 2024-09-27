import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';
import { signOut } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../Image/logo1.png';

const Header = ({authtoken,setAuthtoken}) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const host = config.host;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${host}/api/authenticate/signout`);
      localStorage.removeItem('token');
      dispatch(signOut());
      navigate('/');

    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Define the navigation links
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/Services' },
    { name: 'Booking', path: '/Booking' },
    { name: 'Progress', path: '/Progress' },
    { name: 'About', path: '/About' },
    { name: 'Blogs', path: '/Blogs' },
    { name: 'Contact', path: '/Contact' }
  ];

  return (
    <AppBar position="static" style={{ background: '#f8f9fa', boxShadow: 'none' }}>
      <Container>
        <Toolbar disableGutters style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: 75, marginRight: 16 }} />
          <Typography variant="h6" style={{ flexGrow: 1, color: '#000' }}>
            WellCare Mobile Unit
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.name}
              color="inherit"
              component={Link}
              to={item.path}
              style={{ color: location.pathname === item.path ? '#1976d2' : '#000' }}
            >
              {item.name}
            </Button>
          ))}

          {/* User Menu */}
          {currentUser ? (
            <div>
              <IconButton onClick={handleMenuOpen} style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={currentUser.profilePicture} alt='profile' />
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/Profile">Profile</MenuItem>
                <MenuItem component={Link} to="/Status">Status</MenuItem>
                <MenuItem component={Link} onClick={handleLogout} color="error">
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" sx={{ backgroundColor: 'rgb(220, 0, 78)' }} component={Link} to="/Login">
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
