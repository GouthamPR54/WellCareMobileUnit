import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';
import config from '../Pages/config';

export default function AdminComponent() {
  const host = config.host;

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = () => {
    axios.get(`${host}/api/form/submissions`)
      .then(response => {
        setSubmissions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching submissions:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Info 
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{background:'#2C3333'}}>
              <TableRow>
                <TableCell sx={{color:'white'}}>Name</TableCell>
                <TableCell sx={{color:'white'}}>Email</TableCell>
                <TableCell sx={{color:'white'}}> Phone</TableCell>
                <TableCell sx={{color:'white'}}>Message</TableCell>
                {/* <TableCell>Date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone}</TableCell>
                  <TableCell>{submission.message}</TableCell>
                  {/* <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
