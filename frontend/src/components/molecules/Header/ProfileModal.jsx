import React from 'react';
import { useSelector } from 'react-redux';
// import Close from '@mui/icons-material/Close';
import { Box, Divider } from '@mui/material';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from './style';
import CustomButton from '../../atoms/CustomButton';

const ProfileModal = ({ open, handleClose }) => {
  const { name, email, contactNumber } = useSelector((state) => state.auth?.user?.result);
  return (
    <>
      <CustomModal
        title='MY PROFILE'
        closeIcon
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiPaper-root': {
            maxWidth: '660px',
          },
        }}>
        <Box p={5} pt={0}>
          <Box display='flex' alignItems='center' mt={3} height={216} justifyContent='space-between'>
            <Box display='grid' gap={3} width='350px'>
              <StyledTextField
                size='small'
                placeholder='Business Name'
                value={name}
                label='Business Name'
                name='name'
                InputLabelProps={{
                  style: { color: '#89939E' },
                }}
              />
              <StyledTextField
                size='small'
                placeholder='Contact Number'
                value={contactNumber}
                label='Contact Number'
                name='contactNumber,'
                InputLabelProps={{
                  style: { color: '#89939E' },
                }}
              />
              <StyledTextField
                size='small'
                placeholder='Email'
                value={email}
                label='Email'
                name='email,'
                InputLabelProps={{
                  style: { color: '#89939E' },
                }}
              />
            </Box>
          </Box>
          <Divider sx={{ mt: 3 }} />
          <CustomButton width={130} sx={{ mt: 3, ml: 'auto' }} onClick={handleClose}>
            Okay
          </CustomButton>
        </Box>
      </CustomModal>
    </>
  );
};

export default ProfileModal;
