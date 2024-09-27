import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Container,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Axios from 'axios';
import config from './config';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const host = config.host;

  const fetchUserData = async () => {
    try {
      const response = await Axios.get(`${host}/api/user/getUser`);
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = users.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <Container>
      <Typography sx={{ color: 'black' }}><h2>Manage Users</h2></Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 3 }}>
        {sortedUsers.map((user) => (
          <Card key={user._id} sx={{ maxWidth: 315, padding: 2, backgroundColor: '#F0F5F9' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar alt={user.username} src={user.profileImage || 'path/to/defaultAvatar.jpg'} sx={{ width: 100, height: 100 }} />
            </Box>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                {user.username}
              </Typography>
              <Typography variant="body1"  sx={{mt: 2, textAlign: 'center' }}>
                Email :{user.email}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                Phone: {user.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Created At: {new Date(user.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Updated At: {new Date(user.updatedAt).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <IconButton aria-label="chat" onClick={() => console.log('Chat functionality not implemented yet')}>
                {/* <ChatIcon /> */}
              </IconButton>
              <IconButton aria-label="phone" component="a" href={`tel:${user.phone}`}>
                <PhoneIcon />
              </IconButton>
              <IconButton aria-label="email" component="a" href={`mailto:${user.email}`}>
                <EmailIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ManageUsers;
