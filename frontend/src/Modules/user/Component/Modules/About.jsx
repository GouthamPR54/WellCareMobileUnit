import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import doctor from '../Image/doctor.jpg';
import backgroundImage from '../Image/banner1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(5, 2),
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: "blur(5px)",
      zIndex: 1,
    },
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  header: {
    marginBottom: theme.spacing(5),
    color: 'white',
  },
  content: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    color: 'white',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 800,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(2),
  },
  text: {
    textAlign: 'left',
  },
  teamMember: {
    marginBottom: theme.spacing(4),
  },
  centeredText: {
    textAlign: 'center',
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  const teamMembers = [
    {
      name: 'Dr. Pradeep K P',
      role: 'Chief Physiotherapist',
      description: 'Dr. Pradeep K P has over 26 years of experience in physiotherapy and rehabilitation.',
      avatar: doctor,
    },
  ];

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h2" component="h1" className={`${classes.header} ${classes.centeredText}`}>
          ABOUT US
        </Typography>
        <Typography variant="h6" component="p" className={classes.content}>
          WellCare Mobile Unit is India's fastest growing Delivery Network for Physiotherapy & Chiropractors services. 
          At WellCare Mobile Unit, we are committed to increasing access to quality physio care through ultra-modern clinics and high-skilled practitioners. 
          Our integrated/multi-therapy approach helps keep a strong focus on patient needs and deliver the highest level of patient-centric care with better outcomes.
        </Typography>
        <Typography variant="h6" component="p" className={classes.content}>
          We serve a wide range of patients offering treatment at clinics as well as at the comfort of their homes. 
          We make sure that our clinics are not only equipped with the latest equipment but also provide clean, energetic, and uplifting atmospheres for better healing. 
          For Home Care, our well-established processes ensure delivery of high-quality treatment with superior patient service.
        </Typography>
        <Typography variant="h6" component="p" className={classes.content}>
          Rather than transactional engagement with patients, we are committed to partnering with our patients in their journey of healing. 
          We work with you through your healing from start to finish providing a robust program involving a combination of multiple therapies/modalities. 
          Also, after treatment is over, we provide support/guidance to prevent injury from repeating/pain from returning. 
          The happiness on our patient's faces is what keeps us going.
        </Typography>
        <Typography variant="h3" align="center" gutterBottom style={{ marginBottom: '30px', paddingTop: '5%', fontFamily: 'Georgia' }} className={`${classes.content} ${classes.centeredText}`}>
          OUR TEAM
        </Typography>
        <Grid container spacing={4} className={classes.cardContainer}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} className={classes.teamMember}>
              <Card className={classes.card}>
                <Avatar src={member.avatar} alt={member.name} className={classes.avatar} />
                <CardContent className={classes.text}>
                  <Typography variant="h5" component="div">
                    {member.name}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
