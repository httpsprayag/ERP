import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NotFound = () => {
  const { isLoggedin } = useSelector((state) => state.auth);
  return (
    <Box sx={{ display: 'grid', height: '100vh', placeContent: 'center' }}>
      <Typography sx={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>
        Opps.. Page Not Found
      </Typography>
      <Button
        component={Link}
        variant='contained'
        to={isLoggedin ? '/home' : '/'}
        color='error'
        sx={{
          padding: '1rem',
          textDecoration: 'none',
          backgroundColor: '#FF2626',
          color: '#fff',
          borderRadius: 4,
          mt: 2,
          mx: 'auto',
        }}>
        Back To Home
      </Button>
    </Box>
  );
};
