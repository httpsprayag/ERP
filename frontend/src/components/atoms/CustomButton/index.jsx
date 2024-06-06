import React from 'react';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { pixelToRem } from '../../../utils';

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

const CustomButton = ({
  children,
  type,
  bg,
  onClick,
  variant,
  sx,
  color,
  isFUllWidth,
  disabled,
  startIcon,
  endIcon,
  radius,
  width,
  opacity,
}) => (
  <ThemeProvider theme={theme}>
    <Button
      startIcon={startIcon}
      disabled={disabled || false}
      type={type || 'button'}
      variant={variant || 'contained'}
      color={color || 'error'}
      onClick={onClick}
      sx={{
        ...sx,
        width: isFUllWidth ? '100%' : pixelToRem(width),
        padding: '14px',
        backgroundColor: bg || '#FF2626',
        borderRadius: radius || '0.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: '19.36px',
        fontFamily: 'Inter,  sans-serif',
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: opacity || '1',
      }}>
      {children}
      {endIcon}
    </Button>
  </ThemeProvider>
);

export default CustomButton;
