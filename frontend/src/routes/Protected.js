import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { API_STATUS } from '../utils';

export const ProtectedRoute = () => {
  const { isLoggedIn, loginApiStatus } = useSelector((state) => state?.auth);
  if (loginApiStatus === API_STATUS.pending) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <CircularProgress color='error' sx={{ width: '2rem', height: '2rem' }} />
      </Box>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};
