import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import config from "./config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    success: {
      main: "#2e7d32",
    },
    warning: {
      main: "#ed6c02",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableCell: {
    fontSize: "1rem",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  tableContainer: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
  },
  progress: {
    marginRight: theme.spacing(2),
  },
}));

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [progress, setProgress] = useState(0);
  const [pain, setPain] = useState("");
  const [week, setWeek] = useState("");
  const [lastExam, setLastExam] = useState("");
  const [nextTherapy, setNextTherapy] = useState("");
  const classes = useStyles();
  const host = config.host;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${host}/api/booking/bookings/getAllBookings`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(`${host}/api/booking/bookings/${id}/${status}`);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error updating booking status", error);
      alert("Failed to update booking status");
    }
  };

  const handleProgressDialogOpen = (booking) => {
    setCurrentBooking(booking);
    setProgress(booking.progress || 0);
    setPain(booking.pain || "");
    setWeek(booking.week || "");
    setLastExam(booking.lastExam || "");
    setNextTherapy(booking.nextTherapy || "");
    setProgressDialogOpen(true);
  };

  const handleProgressDialogClose = () => {
    setProgressDialogOpen(false);
    setCurrentBooking(null);
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };

  const handlePainChange = (event) => {
    setPain(event.target.value);
  };

  const handleWeekChange = (event) => {
    setWeek(event.target.value);
  };

  const handleLastExamChange = (event) => {
    setLastExam(event.target.value);
  };

  const handleNextTherapyChange = (event) => {
    setNextTherapy(event.target.value);
  };

  const saveProgress = async () => {
    if (currentBooking) {
      try {
        await axios.put(`${host}/api/booking/progress/${currentBooking._id}`, {
          progress,
          pain,
          week,
          lastExam,
          nextTherapy,
        });
        fetchBookings(); // Refresh bookings
        handleProgressDialogClose();
      } catch (error) {
        console.error("Error updating progress", error);
        alert("Failed to update progress");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom >
            Manage Bookings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table className={classes.table} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: '#2C3333', color: '#FFFFFF' }}>
                    <TableRow >
                      <TableCell className={classes.tableCell} sx={{color:'white'}}>
                        Slot Details
                      </TableCell>
                      <TableCell className={classes.tableCell}sx={{color:'white'}}>
                        Additional Info
                      </TableCell>
                      <TableCell className={classes.tableCell}sx={{color:'white'}}>Status</TableCell>
                      <TableCell className={classes.tableCell}sx={{color:'white'}}>
                        Progress
                      </TableCell>
                      <TableCell className={classes.tableCell}sx={{color:'white'}}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="h6">{booking.service}</Typography>
                          <Typography>ID: {booking._id}</Typography>
                          <Typography>Email: {booking.email}</Typography>
                          <Typography>
                            Date: {new Date(booking.date).toLocaleDateString()}
                          </Typography>
                          <Typography>Time Slot: {booking.timeSlot}</Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography>Phone: {booking.phone}</Typography>
                          <Typography>Location: {booking.location}</Typography>
                          <Typography>Address: {booking.address}</Typography>
                          <Typography>Pin Code: {booking.pinCode}</Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {booking.status === "accepted" && (
                            <Button variant="contained" color="success">
                              {booking.status}
                            </Button>
                          )}
                          {booking.status === "pending" && (
                            <Button variant="contained" color="warning">
                              {booking.status}
                            </Button>
                          )}
                          {booking.status === "rejected" && (
                            <Button variant="contained" color="error">
                              {booking.status}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <div className={classes.progressContainer}>
                            <CircularProgress
                              variant="determinate"
                              value={booking.progress || 0}
                              className={classes.progress}
                            />
                            <Typography>{booking.progress || 0}%</Typography>
                          </div>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {booking.status === "pending" ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() =>
                                  updateBookingStatus(booking._id, "accepted")
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  updateBookingStatus(booking._id, "rejected")
                                }
                              >
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              onClick={() => handleProgressDialogOpen(booking)}
                            >
                              Edit Progress
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        <Dialog open={progressDialogOpen} onClose={handleProgressDialogClose}>
          <DialogTitle>Edit Progress</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Progress"
              type="number"
              fullWidth
              value={progress}
              onChange={handleProgressChange}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              margin="dense"
              label="Pain"
              type="text"
              fullWidth
              value={pain}
              onChange={handlePainChange}
            />
            <TextField
              margin="dense"
              label="Week"
              type="text"
              fullWidth
              value={week}
              onChange={handleWeekChange}
            />
            <TextField
              margin="dense"
              label="Last Exam"
              type="date"
              fullWidth
              value={lastExam}
              onChange={handleLastExamChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Next Therapy"
              type="date"
              fullWidth
              value={nextTherapy}
              onChange={handleNextTherapyChange}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProgressDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={saveProgress} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Admin;
