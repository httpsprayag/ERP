/* eslint-disable no-dupe-keys */
import React from 'react';
import { Box, Dialog, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTypography } from './style';

const CustomModal = ({ open, onClose, children, sx, title, closeIcon }) => (
  <>
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        margin: 'auto',
        ...sx,
        '& .MuiPaper-root': {
          margin: 0,
        },
        width: '460px',
      }}>
      <Box display='grid' gap={3} p={5} pb={0} alignItems='center'>
        <Stack justifyContent='space-between' alignItems='center' direction='row'>
          <StyledTypography>{title}</StyledTypography>
          {closeIcon && <CloseIcon onClick={onClose} sx={{ cursor: 'pointer', width: 24, height: 24 }} />}
        </Stack>
      </Box>
      {children}
    </Dialog>
  </>
);

export default CustomModal;
