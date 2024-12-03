import React from 'react';
import { Alert, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const ErrorAlert = ({ message, reloadBooks }) => (
  <Alert severity="error">
    {message}
    <IconButton onClick={reloadBooks} color="inherit">
      <ReplayIcon />
    </IconButton>
  </Alert>
);

export default ErrorAlert;
