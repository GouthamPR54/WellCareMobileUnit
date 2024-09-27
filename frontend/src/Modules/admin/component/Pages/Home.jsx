import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import Axios from 'axios';
import config from './config';
import { Add as AddIcon, ViewList as ViewListIcon, CalendarToday as CalendarTodayIcon, AccountCircle as AccountCircleIcon, Delete as DeleteIcon, People as PeopleIcon, EventNote as EventNoteIcon } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: '8px',
  padding: '16px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TableWrapper = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  marginBottom: theme.spacing(2),
}));

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [tomorrowsAppointments, setTomorrowsAppointments] = useState([]);
  const host = config.host;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get(`${host}/api/authenticate`);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await Axios.get(`${host}/api/booking`);
        setBookings(response.data);
        filterAppointments(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    const filterAppointments = (allBookings) => {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const todays = allBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === today.toDateString();
      });

      const tomorrows = allBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === tomorrow.toDateString();
      });

      setTodaysAppointments(todays);
      setTomorrowsAppointments(tomorrows);
    };

    const loadSavedNotes = () => {
      const notes = JSON.parse(localStorage.getItem('adminNotes')) || [];
      setSavedNotes(notes);
    };

    fetchUsers();
    fetchBookings();
    loadSavedNotes();
  }, [host]);

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSaveNote = () => {
    const newNote = { id: Date.now(), text: notes };
    const updatedNotes = [...savedNotes, newNote];
    setSavedNotes(updatedNotes);
    localStorage.setItem('adminNotes', JSON.stringify(updatedNotes));
    setNotes('');
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = savedNotes.filter(note => note.id !== id);
    setSavedNotes(updatedNotes);
    localStorage.setItem('adminNotes', JSON.stringify(updatedNotes));
  };

  const handleViewUsers = () => {
    navigate('/admin/ManageUser'); 
  };

  const handleViewBookings = () => {
    navigate('/admin/ManageBooking'); 
  };

  const recentUsers = users.slice(-3);
  const recentBookings = bookings.slice(-3);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F0F4F8',display:'flex',width:'100%',justifyContent:'space-between',gap:'20px'}}>
      <Grid container spacing={3}  fullWidth>
        {/* Total Registered Users Card */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Total Registered Users</Typography>}
              sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
              action={<PeopleIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />}
            />
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" component="div">
                {users.length}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Total Bookings Card */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Total Bookings</Typography>}
              sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
              action={<EventNoteIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />}
            />
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" component="div">
                {bookings.length}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        

      

        {/* Today's and Tomorrow's Schedule */}
        <Grid item xs={12} md={12}>
          <Grid container spacing={3}>
            {/* Today's Schedule */}
            <Grid item xs={12} md={12}>
              <StyledCard>
                <CardHeader
                  title={<Typography variant="h6">Today's Schedule</Typography>}
                  sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
                />
                <CardContent>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Patient</StyledTableCell>
                          <StyledTableCell>Time</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>Phone</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {todaysAppointments.length === 0 ? (
                          <TableRow>
                            <StyledTableCell colSpan={4}>
                              <Typography>No appointments for today.</Typography>
                            </StyledTableCell>
                          </TableRow>
                        ) : (
                          todaysAppointments.map((appointment) => (
                            <TableRow key={appointment._id}>
                              <StyledTableCell>{appointment.name}</StyledTableCell>
                              <StyledTableCell>{appointment.timeSlot}</StyledTableCell>
                              <StyledTableCell>{appointment.email}</StyledTableCell>
                              <StyledTableCell>{appointment.phone}</StyledTableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Tomorrow's Schedule */}
            <Grid item xs={12} md={12}>
              <StyledCard>
                <CardHeader
                  title={<Typography variant="h6">Tomorrow's Schedule</Typography>}
                  sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
                />
                <CardContent>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Patient</StyledTableCell>
                          <StyledTableCell>Time</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>Phone</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tomorrowsAppointments.length === 0 ? (
                          <TableRow>
                            <StyledTableCell colSpan={4}>
                              <Typography>No appointments for tomorrow.</Typography>
                            </StyledTableCell>
                          </TableRow>
                        ) : (
                          tomorrowsAppointments.map((appointment) => (
                            <TableRow key={appointment._id}>
                              <StyledTableCell>{appointment.name}</StyledTableCell>
                              <StyledTableCell>{appointment.timeSlot}</StyledTableCell>
                              <StyledTableCell>{appointment.email}</StyledTableCell>
                              <StyledTableCell>{appointment.phone}</StyledTableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Recent User Registrations */}
        <Grid item xs={12} md={12}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Recent User Registrations</Typography>}
              sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
              action={<IconButton aria-label="view-users" sx={{color:'#FFFFFF'}} onClick={handleViewUsers}><ViewListIcon /></IconButton>}
            />
            <CardContent>
              <TableWrapper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Profile Picture</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Phone</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.email}>
                        <TableCell>
                          <Avatar src={user.profilePicture} alt={user.name} sx={{ width: 56, height: 56 }} />
                        </TableCell>
                        <StyledTableCell>{user.name}</StyledTableCell>
                        <StyledTableCell>{user.email}</StyledTableCell>
                        <StyledTableCell>{user.phone}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '10px' }}
                onClick={handleViewUsers}
                startIcon={<AccountCircleIcon />}
              >
                View All Users
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={12}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Recent Bookings</Typography>}
              sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
              action={<IconButton aria-label="view-bookings" sx={{color:'#FFFFFF'}} onClick={handleViewBookings}><ViewListIcon /></IconButton>}
            />
            <CardContent>
              <TableWrapper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Patient</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Phone</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <StyledTableCell>{booking.name}</StyledTableCell>
                        <StyledTableCell>{booking.date}</StyledTableCell>
                        <StyledTableCell>{booking.email}</StyledTableCell>
                        <StyledTableCell>{booking.phone}</StyledTableCell>
                        <StyledTableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              color: booking.status === 'progress' ? 'green' : 'red',
                              fontWeight: 'bold'
                            }}
                          >
                            {booking.status}
                          </Typography>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '10px' }}
                onClick={handleViewBookings}
                startIcon={<CalendarTodayIcon />}
              >
                View All Bookings
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Grid container >
          {/* Note Section */}
          <Grid item xs={12} md={12}>
          <StyledCard>
            <CardHeader
              title={<Typography variant="h6">Admin Notes</Typography>}
              action={<IconButton aria-label="add-note"sx={{color:'#FFFFFF'}} onClick={handleSaveNote}><AddIcon /></IconButton>}
              sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}
            />
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={notes}
                onChange={handleNoteChange}
                placeholder="Write your notes here..."
                sx={{ marginBottom: '10px' }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '10px' }}
                onClick={handleSaveNote}
              >
                Save Note
              </Button>
              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6">Saved Notes</Typography>
                {savedNotes.length === 0 ? (
                  <Typography>No notes saved yet.</Typography>
                ) : (
                  savedNotes.map(note => (
                    <Card key={note.id} sx={{ marginBottom: '10px', position: 'relative' }}>
                      <CardContent>
                        <Typography>{note.text}</Typography>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteNote(note.id)}
                          sx={{ position: 'absolute', top: 8, right: 8 ,color:'#FFFFFF' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
