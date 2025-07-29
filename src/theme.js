import { createTheme } from '@mui/material/styles';
 
const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});
 
export default theme;