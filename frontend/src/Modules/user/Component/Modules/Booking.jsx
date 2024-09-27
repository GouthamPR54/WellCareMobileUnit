import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Snackbar,
  IconButton,
  SnackbarContent,
} from "@mui/material";
import { format, addDays, nextSunday } from "date-fns";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Navigation from "../Nav/Navigation";
import { makeStyles } from "@mui/styles";
import backgroundImage from "../Image/banner1.png";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import config from "../config";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "25vh",
    position: "relative",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    color: "#fff",
    padding: theme.spacing(5),
  },
  colorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    borderRadius: "8px",
    padding: theme.spacing(9),
    animation: `$fadeIn 2s ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  heading: {
    marginBottom: theme.spacing(4),
    animation: `$slideUp 1s ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes slideUp": {
    from: { transform: "translateY(20px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  calendar: {
    backgroundColor: "#FCF8F3",
    color: "black",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const localizer = momentLocalizer(moment);

const theme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffffd0",
          borderRadius: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

const BookingPage = ({ authtoken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [service, setService] = useState("");
  const [events, setEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'
  const classes = useStyles();
  const host = config.host;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`${host}/api/slots/getAllSlots`);
      const eventsData = response.data.flatMap((slot) => {
        // Validate slot data
        if (!slot.date || !Array.isArray(slot.slots)) {
          console.error("Invalid slot data:", slot);
          return []; // Skip invalid slots
        }

        const date = new Date(slot.date);
        return slot.slots.map((timeSlot) => {
          const [startTime, endTime] = timeSlot.split(" - ");
          const [startHour, startMinute] = startTime.split(":");
          const [endHour, endMinute] = endTime.split(":");
          return {
            title: timeSlot,
            start: new Date(
              date.setHours(parseInt(startHour, 10), parseInt(startMinute, 10))
            ),
            end: new Date(
              date.setHours(parseInt(endHour, 10), parseInt(endMinute, 10))
            ),
          };
        });
      });
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching slots", error);
    }
  };


  console.log("Booking slots : ",authtoken)

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Full Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!phone) newErrors.phone = "Phone Number is required.";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone Number should be 10 digits.";
    if (!location) newErrors.location = "Location is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!pinCode) newErrors.pinCode = "Pin Code is required.";
    else if (!/^\d{6}$/.test(pinCode))
      newErrors.pinCode = "Pin Code should be 6 digits.";
    if (!date) newErrors.date = "Date is required.";
    if (!timeSlot) newErrors.timeSlot = "Time Slot is required.";
    if (!service) newErrors.service = "Service is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bookingData = {
        name,
        email,
        phone,
        location,
        address,
        pinCode,
        date,
        timeSlot,
        service,
      };
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("No authentication token found.");
      }

      await axios.post(`${host}/api/booking/bookings`, bookingData, {
        headers: {
          "auth-token": token,
        },
      });
      setSnackbarMessage("Booking successful!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error creating booking", error);
      setSnackbarMessage("Failed to create booking");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getFormattedDate = (date) => format(date, "yyyy-MM-dd");
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfter = addDays(today, 2);
  const weekend = nextSunday(today);

  return (
    <>
      {/* <Navigation /> */}
      <Box className={classes.root}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Booking
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                Doctor Available
              </Typography>
              <Box
                sx={{
                  height: "500px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                className={classes.calendar}
              >
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                Book Appointment
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Location"
                      variant="outlined"
                      fullWidth
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Pin Code"
                      variant="outlined"
                      fullWidth
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Select Day"
                      variant="outlined"
                      fullWidth
                      select
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    >
                      <MenuItem value={getFormattedDate(today)}>Today</MenuItem>
                      <MenuItem value={getFormattedDate(tomorrow)}>
                        Tomorrow
                      </MenuItem>
                      <MenuItem value={getFormattedDate(dayAfter)}>
                        Day After Tomorrow
                      </MenuItem>
                      <MenuItem value={getFormattedDate(weekend)}>
                        Weekend
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Select Time Slot"
                      variant="outlined"
                      fullWidth
                      select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      required
                    >
                      <MenuItem value="09:00 AM - 10:00 AM">
                        09:00 AM - 10:00 AM
                      </MenuItem>
                      <MenuItem value="10:00 AM - 11:00 AM">
                        10:00 AM - 11:00 AM
                      </MenuItem>
                      <MenuItem value="11:00 AM - 12:00 PM">
                        11:00 AM - 12:00 PM
                      </MenuItem>
                      <MenuItem value="01:00 PM - 02:00 PM">
                        01:00 PM - 02:00 PM
                      </MenuItem>
                      <MenuItem value="02:00 PM - 03:00 PM">
                        02:00 PM - 03:00 PM
                      </MenuItem>
                      <MenuItem value="03:00 PM - 04:00 PM">
                        03:00 PM - 04:00 PM
                      </MenuItem>
                      <MenuItem value="04:00 PM - 05:00 PM">
                        04:00 PM - 05:00 PM
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Select Service"
                      variant="outlined"
                      fullWidth
                      select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                    >
                      <MenuItem value="Physiotherapy Consultation">
                        Physiotherapy Consultation
                      </MenuItem>
                      <MenuItem value="Sports Injury Treatment">
                        Sports Injury Treatment
                      </MenuItem>
                      <MenuItem value="Rehabilitation">Rehabilitation</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    {authtoken ===true ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Book Appointment
                      </Button>
                    ) : (
                      <Link to={"/user/login"}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Book Appointment
                        </Button>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </form>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                ContentProps={{
                  sx: {
                    bgcolor: snackbarSeverity === "success" ? "green" : "red",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default BookingPage;
