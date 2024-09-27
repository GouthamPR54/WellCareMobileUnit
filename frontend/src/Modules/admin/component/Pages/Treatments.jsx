import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Paper,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  TextField,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import config from '../Pages/config';
import background1 from '../Image/background1.jpeg';

const initialTreatments = [
  // initial treatment data
];

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '10px',
          borderRadius: '10px',
          padding: '5px 10px',
          fontWeight: 'bold',
          backgroundImage: 'linear-gradient(to right)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

const Treatments = () => {
  const host = config.host;
  const { id } = useParams();
  const [treatments, setTreatments] = useState(initialTreatments);
  const [open, setOpen] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await Axios.get(`${host}/api/treatment/getAllTreatments/${id}`);
      setTreatments(response.data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    }
  };

  const handleAddTreatment = () => {
    setCurrentTreatment(null);
    setOpen(true);
  };

  const handleEditTreatment = (treatment) => {
    setCurrentTreatment(treatment);
    setOpen(true);
  };

  const handleDelete = async (treatmentId) => {
    try {
      await Axios.delete(`${host}/api/Treatment/delete/${treatmentId}`);
      setTreatments(treatments.filter((treatment) => treatment._id !== treatmentId));
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTreatment = async (treatment, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('title', treatment.title);
      formData.append('description', treatment.description);
      formData.append('symptoms', treatment.symptoms);
      formData.append('causes', treatment.causes);
      formData.append('treatmentOptions', treatment.treatmentOptions);
      formData.append('homeRemedies', treatment.homeRemedies);
      formData.append('exercises', treatment.exercises);
      formData.append('faqs', JSON.stringify(treatment.faqs));
      formData.append('image', imageFile);

      if (treatment._id) {
        const response = await Axios.put(`${host}/api/treatment/updateTreatment/${treatment._id}`, formData);
        setTreatments((prevTreatments) => prevTreatments.map((t) => (t._id === treatment._id ? response.data : t)));
      } else {
        const response = await Axios.post(`${host}/api/treatment/createTreatment`, formData);
        setTreatments((prevTreatments) => [...prevTreatments, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving treatment:', error);
    }
  };

  const TreatmentForm = ({ treatment, onSave }) => {
    const [title, setTitle] = useState(treatment ? treatment.title : '');
    const [description, setDescription] = useState(treatment ? treatment.description : '');
    const [symptoms, setSymptoms] = useState(treatment ? treatment.symptoms : '');
    const [causes, setCauses] = useState(treatment ? treatment.causes : '');
    const [treatmentOptions, setTreatmentOptions] = useState(treatment ? treatment.treatmentOptions : '');
    const [homeRemedies, setHomeRemedies] = useState(treatment ? treatment.homeRemedies : '');
    const [exercises, setExercises] = useState(treatment ? treatment.exercises : '');
    const [faqs, setFaqs] = useState(treatment ? treatment.faqs : []);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(treatment ? treatment.image : null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleAddFAQ = () => {
      setFaqs([...faqs, { question: '', answer: '' }]);
    };

    const handleFAQChange = (e, index) => {
      const { name, value } = e.target;
      const newFaqs = faqs.map((faq, i) =>
        i === index ? { ...faq, [name]: value } : faq
      );
      setFaqs(newFaqs);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const savedTreatment = {
        ...treatment,
        title,
        description,
        symptoms,
        causes,
        treatmentOptions,
        homeRemedies,
        exercises,
        faqs,
      };
      onSave(savedTreatment, imageFile);
    };

    return (
      <form onSubmit={handleSubmit} style={{
        padding: '20px',
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            {previewImage && (
              <CardMedia
                component="img"
                height="200"
                image={previewImage}
                alt="Preview"
                style={{ marginBottom: '10px' }}
              />
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" color="primary">
                Upload Image
              </Button>
            </label>
          </div>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Symptoms"
            variant="outlined"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Causes"
            variant="outlined"
            value={causes}
            onChange={(e) => setCauses(e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Treatment Options"
            variant="outlined"
            value={treatmentOptions}
            onChange={(e) => setTreatmentOptions(e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Home Remedies"
            variant="outlined"
            value={homeRemedies}
            onChange={(e) => setHomeRemedies(e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Exercises"
            variant="outlined"
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
            multiline
            rows={3}
            required
          />
          {faqs.map((faq, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TextField
                label="FAQ Question"
                variant="outlined"
                name="question"
                value={faq.question}
                onChange={(e) => handleFAQChange(e, index)}
              />
              <TextField
                label="FAQ Answer"
                variant="outlined"
                name="answer"
                value={faq.answer}
                onChange={(e) => handleFAQChange(e, index)}
              />
            </Box>
          ))}
          <center>
            <Button variant="contained" color="secondary" onClick={handleAddFAQ} sx={{ width: '20%' }}>
              Add FAQ
            </Button>
          </center>
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            required
          />
          <center>
            <Button variant="contained" type="submit" color="primary" size="large" sx={{ width: '50%' }}>
              Save
            </Button>
          </center>
        </Box>
      </form>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          padding: '20px',
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom style={{ marginBottom: '20px', color: 'black' }}>
            Physiotherapy Treatments
          </Typography>
          <Button variant="contained" color="success" onClick={handleAddTreatment}>
            Add Treatment
          </Button>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {treatments.map((treatment) => (
              <Grid item xs={12} sm={6} md={4} key={treatment._id || treatment.id}>
                <Paper
                  sx={{
                    padding: '20px',
                    backgroundColor: '#ffffffd0',
                    borderRadius: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => navigate(`/admin/TreatmentDetail/${treatment._id || treatment.id}`)}
                >
                  <center>
                    <CardMedia
                      sx={{ height: 350, borderRadius: '10px' }}
                      component="img"
                      image={`${host}/api/image/${treatment.image}`}
                      alt={treatment.title}
                    />
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ fontStyle: 'Times New Roman', color: 'black', fontSize: '20px', paddingTop: '5%' }}
                    >
                      {treatment.title}
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTreatment(treatment);
                          }}
                          sx={{ fontStyle: 'Helvetica', color: 'black', fontSize: '16px' }}
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(treatment._id || treatment.id);
                          }}
                          color="error"
                          sx={{ fontSize: '16px' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </center>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{currentTreatment ? 'Edit Treatment' : 'Add Treatment'}</DialogTitle>
            <DialogContent dividers>
              <TreatmentForm treatment={currentTreatment} onSave={handleSaveTreatment} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Treatments;
