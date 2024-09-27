import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PeopleIcon from '@mui/icons-material/People';
import config from '../Pages/config';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;
const host=config.host;
// const token = JSON.parse(localStorage.getItem('token'));


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: '#2C3333',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navigation() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  
  
const handleLogout = async () => {
  
  try {
    await fetch(`${host}/api/authenticate/signout`);
    localStorage.removeItem('token');
    // dispatch(signOut());
    navigate('/adminLogin');

  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    const currentRoute = location.pathname;

    if (currentRoute === '/admin/') {
      setActiveItem('Home');
    } else if (currentRoute.includes('/ManageBooking')) {
      setActiveItem('Manage Booking');
    } else if (currentRoute.includes('/ManageUser')) {
      setActiveItem('Manage User');
    } else if (currentRoute.includes('/admin/Treatments')) {
      setActiveItem('Manage Service');
    } else if (currentRoute.includes('/admin/Calender')) {
      setActiveItem('Calender');
    } else if (currentRoute.includes('/Feedback')) {
      setActiveItem('Feedback');
    } else if (currentRoute.includes('/Blogs')) {
      setActiveItem('Blogs');
    } else {
      setActiveItem('Home');
    }
  }, [location.pathname]);

  const sideBarList = [
    { title: 'Home', path: '/admin/', icon: <HomeIcon /> },
    { title: 'Manage Booking', path: '/admin/ManageBooking', icon: <DashboardIcon /> },
    { title: 'Manage Service', path: '/admin/Treatments', icon: <BookIcon /> },
    { title: 'Manage User', path: '/admin/ManageUser', icon: <PeopleIcon /> },
    { title: 'Blogs', path: '/admin/Blogs', icon: <LocalLibraryIcon /> },
    { title: 'Calender', path: '/admin/Calender', icon: <EventIcon /> },
    { title: 'Feedback', path: '/admin/Feedback', icon: <FeedbackIcon /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#2C3333' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: 'white',
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white', flexGrow: 1 }}>
            WellCare Mobile Unit
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white', marginRight: 2 }}>
            Admin
          </Typography>
          <IconButton color="inherit">
            <ExitToAppIcon sx={{ color: 'white' }} onClick={handleLogout} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ background: 'white' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {sideBarList.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <Link to={item.path} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: activeItem === item.title ? 'rgba(194, 244, 219, 0.12)' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 244, 219, 0.12)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: activeItem === item.title ? '#44ce42' : 'inherit',
                      '&:hover': {
                        color: '#44ce42',
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <DrawerHeader />
    </>
  );
}
