import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorDisplay = ({ message, suggestion = 'Please try again or return to a valid page.' }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 5, textAlign: 'center' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
        {suggestion}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorDisplay;
