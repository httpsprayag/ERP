import { Box, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import { StyledBackdrop, TogglerBox, TogglerContainer } from './style';

export const PrivacyToggler = ({ fullWidth }) => {
  const [open, setOpen] = useState(false);
  return (
    <TogglerContainer>
      <TogglerBox fullWidth={fullWidth}>
        <Typography variant='body1' sx={{ width: 'max-content', lineHeight: '19.36px' }}>
          Privacy
        </Typography>
        <Switch color='error' size='small' checked={open} onChange={() => setOpen(!open)} sx={{ ml: 'auto' }} />
      </TogglerBox>
      <StyledBackdrop open={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
            maxWidth: '471px',
            maxHeight: '228px',
          }}>
          <Box component='img' src='./icons/privacy.svg' alt='privacy' sx={{ width: 120, height: 120 }}></Box>
          <Box
            sx={{
              backgroundColor: '#4D4D4D',
              padding: 2,
              borderRadius: 2,
              height: { xs: 'auto', md: '84px' },
              width: { xs: 'auto', md: '439px' },
            }}>
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '26.4px',
                textAlign: { md: 'center' },
                fontFamily: 'Inter, sans-serif',
                letterSpacing: 0,
              }}>
              Privacy Mode enabled.
            </Typography>
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '26.4px',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: 0,
              }}>
              Please toggle the Privacy button to view your Dashboard.
            </Typography>
          </Box>
        </Box>
      </StyledBackdrop>
    </TogglerContainer>
  );
};
