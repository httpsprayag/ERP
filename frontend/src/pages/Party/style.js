import { Box, Switch, TextField, Typography, styled } from '@mui/material';

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '14px',
}));

export const StyledHeadingTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '20px',
}));

export const StyledBox = styled(Box)(() => ({
  height: '100%',
  padding: '24px',
}));

export const StyledTextarea = styled(TextField)`
  width: 100%;
  height: 130px;
  border: none;
  border-radius: 0.5rem;
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: 1px solid #89939e;
  }
`;

export const IOSSwitch = styled(({ checked, onChange, ...props }) => (
  // eslint-disable-next-line
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple checked={checked} onChange={onChange} {...props} />
))(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#89939E' : '#00DC82',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
