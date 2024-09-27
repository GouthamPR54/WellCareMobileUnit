import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import config from './config';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const host = config.host;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState({});
  const [currentSlot, setCurrentSlot] = useState({ start: '', end: '' });
  const [currentEditSlot, setCurrentEditSlot] = useState(null);
  const [events, setEvents] = useState([]);
  const [dbSlots, setDbSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
    fetchSlotsFromDatabase(); // Fetch data from database when component mounts
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`${host}/api/slots/getAllSlots`);
      const slotsData = response.data.reduce((acc, { date, slots }) => {
        acc[date] = slots;
        return acc;
      }, {});
      setSlots(slotsData);
      const eventsData = response.data.flatMap(({ date, slots }) => 
        slots.map(slot => {
          const [start, end] = slot.split(' - ');
          return {
            title: slot,
            start: new Date(new Date(date).setHours(start.split(':')[0], start.split(':')[1])),
            end: new Date(new Date(date).setHours(end.split(':')[0], end.split(':')[1]))
          };
        })
      );
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching slots', error);
    }
  };

  const fetchSlotsFromDatabase = async () => {
    try {
      const response = await axios.get(`${host}/api/slots/getAllSlots`);
      setDbSlots(response.data); // Assuming response.data is an array of slots objects
    } catch (error) {
      console.error('Error fetching slots from database', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotChange = (event) => {
    setCurrentSlot({ ...currentSlot, [event.target.name]: event.target.value });
  };

  const handleSaveSlot = async () => {
    const dateStr = selectedDate.toDateString();
    const newSlot = `${currentSlot.start} - ${currentSlot.end}`;
    let updatedSlots;
    let updatedEvents;
    if (currentEditSlot !== null) {
      updatedSlots = slots[dateStr].map((slot, index) => (
        index === currentEditSlot ? newSlot : slot
      ));
      updatedEvents = events.map((event, index) => (
        index === currentEditSlot ? {
          title: newSlot,
          start: new Date(selectedDate.setHours(currentSlot.start.split(':')[0], currentSlot.start.split(':')[1])),
          end: new Date(selectedDate.setHours(currentSlot.end.split(':')[0], currentSlot.end.split(':')[1]))
        } : event
      ));
    } else {
      updatedSlots = slots[dateStr] ? [...slots[dateStr], newSlot] : [newSlot];
      updatedEvents = [
        ...events,
        {
          title: newSlot,
          start: new Date(selectedDate.setHours(currentSlot.start.split(':')[0], currentSlot.start.split(':')[1])),
          end: new Date(selectedDate.setHours(currentSlot.end.split(':')[0], currentSlot.end.split(':')[1]))
        }
      ];
    }
    setSlots((prev) => ({
      ...prev,
      [dateStr]: updatedSlots
    }));
    setEvents(updatedEvents);

    setCurrentEditSlot(null);
    setOpen(false);
  };

  const handleSaveToDatabase = async () => {
    try {
      await axios.post(`${host}/api/slots/saveOrUpdateSlot`, { slots });
      alert('Slots saved successfully!');
    } catch (error) {
      console.error('Error saving slots', error);
    }
  };

  const handleEditSlot = (dateStr, index) => {
    const slot = slots[dateStr][index];
    const [start, end] = slot.split(' - ');
    setSelectedDate(new Date(dateStr));
    setCurrentSlot({ start, end });
    setCurrentEditSlot(index);
    setOpen(true);
  };

  const handleDeleteSlot = async (dateStr, index) => {
    const updatedSlots = slots[dateStr].filter((_, i) => i !== index);
    setSlots((prev) => ({
      ...prev,
      [dateStr]: updatedSlots
    }));
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);

    try {
      await axios.post(`${host}/api/slots/saveOrUpdateSlot`, { date: dateStr, slots: updatedSlots });
    } catch (error) {
      console.error('Error deleting slot', error);
    }
  };

  const openDialog = () => setOpen(true);
  const closeDialog = () => {
    setCurrentEditSlot(null);
    setOpen(false);
  };

  const times = Array.from({ length: 24 }, (_, i) => i).map((hour) =>
    [`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`]
  ).flat();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Calendar
      </Typography>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<TextField label="Select Date" fullWidth />}
      />
      <Button variant="contained" color="primary" onClick={openDialog} sx={{ mt: 2 }}>
        Modify Slots
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Modify Slots</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Start Time</InputLabel>
            <Select
              value={currentSlot.start}
              onChange={handleSlotChange}
              name="start"
              label="Start Time"
            >
              {times.map((time) => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>End Time</InputLabel>
            <Select
              value={currentSlot.end}
              onChange={handleSlotChange}
              name="end"
              label="End Time"
            >
              {times.map((time) => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSaveSlot}>Save Slot</Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="secondary" onClick={handleSaveToDatabase} sx={{ mt: 2 }}>
        Save All Slots
      </Button>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Availability for the Week</Typography>
        <Grid container spacing={2}>
          {Object.entries(slots).map(([date, slotsArray]) => (
            <Grid item xs={12} key={date}>
              <Typography variant="body1">{date}:</Typography>
              {slotsArray.map((slot, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>{slot}</Typography>
                  <IconButton size="small" onClick={() => handleEditSlot(date, index)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteSlot(date, index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 3, height: '500px', backgroundColor: '#FCF8F3', color: 'black' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Slots Fetched from Database</Typography>
        <Grid container spacing={2}>
          {dbSlots.map((slot, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body1">{slot.date}</Typography>
              {slot.slots.map((timeSlot, idx) => (
                <Typography key={idx}>{timeSlot}</Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Calendar;
