import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Navigation from '../Nav/Navigation';
import { styled } from '@mui/material/styles';
import {
  CardMedia,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import config from '../Pages/config';
import background1 from '../Image/background1.jpeg';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const useStyles = styled((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: '100vh',
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${background1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  imageUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  previewImage: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
}));

const TreatmentDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const host = config.host;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await Axios.get(`${host}/api/treatment/getTreatment/${id}`);
        setTreatment(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching treatment:', error);
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [id, host]);

  const handleEditTreatment = () => {
    setCurrentTreatment(treatment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTreatment = async (updatedTreatment, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedTreatment.title);
      formData.append('description', updatedTreatment.description);
      formData.append('symptoms', updatedTreatment.symptoms);
      formData.append('causes', updatedTreatment.causes);
      formData.append('treatmentOptions', updatedTreatment.treatmentOptions);
      formData.append('homeRemedies', updatedTreatment.homeRemedies);
      formData.append('exercises', updatedTreatment.exercises);
      formData.append('faqs', JSON.stringify(updatedTreatment.faqs));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await Axios.put(`${host}/api/treatment/updateTreatment/${updatedTreatment._id}`, formData);
      setTreatment(response.data);
      setOpen(false);
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
      <form onSubmit={handleSubmit} className={classes.form}>
        {previewImage && (
          <CardMedia
            component="img"
            className={classes.previewImage}
            image={previewImage}
            alt="Preview"
          />
        )}
        <div className={classes.imageUpload}>
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
        <Button variant="contained" color="secondary" onClick={handleAddFAQ}>
          Add FAQ
        </Button>
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          required
        />
        <Button variant="contained" type="submit" color="primary" size="large">
          Save
        </Button>
      </form>
    );
  };

  if (loading) {
    return (
      <Box className={classes.root}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <DrawerHeader />
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className={classes.root}>
        {/* <Navigation /> */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          <Paper className={classes.paper}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4" className={classes.title}>
                {treatment.title}
              </Typography>
              <IconButton color="primary" onClick={handleEditTreatment}>
                <EditIcon />
              </IconButton>
            </Box>
            <CardMedia
              component="img"
              height="350"
              image={`${host}/api/image/${treatment.image}`}
              alt={treatment.title}
              className={classes.previewImage}
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Description:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.description}
            </Typography>
            <Typography variant="h6" className={classes.sectionTitle}>
              Symptoms:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.symptoms}
            </Typography>
            <Typography variant="h6" className={classes.sectionTitle}>
              Causes:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.causes}
            </Typography>
            <Typography variant="h6" className={classes.sectionTitle}>
              Treatment Options:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.treatmentOptions}
            </Typography>
            <Typography variant="h6" className={classes.sectionTitle}>
              Home Remedies:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.homeRemedies}
            </Typography>
            <Typography variant="h6" className={classes.sectionTitle}>
              Exercises:
            </Typography>
            <Typography variant="body1" paragraph>
              {treatment.exercises}
            </Typography>
            <Typography variant="h6" className={classes.sectionTitle}>
              FAQs:
            </Typography>
            {treatment.faqs.map((faq, index) => (
              <Accordion key={index} className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Treatment</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <TreatmentForm treatment={currentTreatment} onSave={handleSaveTreatment} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TreatmentDetail;
