// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F3645', // Customize your primary color
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    h3: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1.25rem',
    },
  },
  
});

export default theme;
