import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import config from "../config";
import { jwtDecode } from "jwt-decode";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PainIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WeekIcon from "@mui/icons-material/DateRange";
import LastExamIcon from "@mui/icons-material/HistoryEdu";
import NextTherapyIcon from "@mui/icons-material/Event";
import backgroundImage from "../Image/banner1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  header: {
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
  icon: {
    fontSize: "4rem",
    marginBottom: theme.spacing(1),
  },
  painIcon: {
    color: "#f44336",
  },
  weekIcon: {
    color: "#ffeb3b",
  },
  lastExamIcon: {
    color: "#2196f3",
  },
  nextTherapyIcon: {
    color: "#4caf50",
  },
  detailPaper: {
    minHeight: "230px",
    paddingTop: '70px',
    justifyContent: "center",
  },
}));

const UserProgress = () => {
  const [bookings, setBookings] = useState([]);
  const classes = useStyles();
  const host = config.host;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get(`${host}/api/booking/bookings`, {
        params: { userId },
        headers: { "Auth-token": token },
      });
      // Sort bookings so that newer entries appear first
      const sortedBookings = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  return (
    <>
      <Box className={classes.header}>
        <div className={classes.colorOverlay}></div>
        <Container>
          <Box className={classes.content}>
            <Typography variant="h2" className={classes.heading}>
              Your Health Progress
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container className={classes.root} maxWidth="lg">
        {bookings.length === 0 ? (
          <Typography variant="h6" align="center">
            No Progress
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {/* New Progress Section */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                New Progress
              </Typography>
            </Grid>
            {bookings.map((booking) => (
              <React.Fragment key={booking._id}>
                {/* Main booking details */}
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={classes.paper}>
                    <Typography variant="h6">{booking.service}</Typography>
                    <Typography variant="h6">Name: {booking.name}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </Typography>
                    <Box className={classes.progressContainer}>
                      <CircularProgressbar
                        value={booking.progress || 0}
                        text={`${booking.progress || 0}%`}
                        styles={buildStyles({
                          pathColor:
                            booking.progress >= 80
                              ? "#4caf50"
                              : booking.progress >= 50
                              ? "#ffeb3b"
                              : "#f44336",
                          textColor: "#000",
                          trailColor: "#d6d6d6",
                          strokeLinecap: "round",
                        })}
                      />
                    </Box>
                  </Paper>
                </Grid>

                {/* Responsive Grid for details */}
                <Grid item xs={12} sm={6} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Paper className={`${classes.paper} ${classes.detailPaper}`}>
                        <PainIcon className={`${classes.icon} ${classes.painIcon}`} />
                        <Typography variant="h6">Pain: {booking.pain || "N/A"}</Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Paper className={`${classes.paper} ${classes.detailPaper}`}>
                        <LastExamIcon className={`${classes.icon} ${classes.lastExamIcon}`} />
                        <Typography variant="h6">
                          Last Exam: {booking.lastExam ? new Date(booking.lastExam).toLocaleDateString() : "N/A"}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Paper className={`${classes.paper} ${classes.detailPaper}`}>
                        <WeekIcon className={`${classes.icon} ${classes.weekIcon}`} />
                        <Typography variant="h6">Week: {booking.week || "N/A"}</Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Paper className={`${classes.paper} ${classes.detailPaper}`}>
                        <NextTherapyIcon className={`${classes.icon} ${classes.nextTherapyIcon}`} />
                        <Typography variant="h6">
                          Next Therapy: {booking.nextTherapy ? new Date(booking.nextTherapy).toLocaleDateString() : "N/A"}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default UserProgress;
