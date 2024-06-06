/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../atoms/CustomModal';
import CustomButton from '../../atoms/CustomButton';
import { persistor } from '../../../redux/store';

const LogoutModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate('/');
    return persistor.purge();
  };

  return (
    <>
      <CustomModal open={open} onClose={handleClose}>
        <Box p={5} pt={3} display='flex' flexDirection='column' alignItems='center' gap={2} fontFamily='Inter'>
          <img src='/icons/logout.svg' width={24} height={24} alt='logout' />
          <Typography fontWeight={800} fontSize={24} lineHeight='29.6px' color='#212121'>
            Confirm Logout
          </Typography>
          <Typography fontWeight={400} fontSize={16} lineHeight='26px' color='#717171'>
            Are you sure you want to Logout?
          </Typography>
          <Box display='flex' justifyContent='space-between' width='100%' alignItems='center' gap={2} mt={1}>
            <CustomButton width={165} variant='outlined' bg='transparent' onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton width={165} onClick={handleLogout}>
              Logout
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default LogoutModal;
