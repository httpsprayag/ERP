import { TextField, Typography, styled } from '@mui/material';

export const StyledTextField = styled(TextField)`
  max-height: 40px;
  width: 100%;
  max-width: 380px;
  padding: 0;
  border-radius: 0.5rem;
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: 1px solid #89939e;
  }
`;

export const StyledTextarea = styled(TextField)`
  width: 100%;
  max-width: 380px;
  height: 130px;
  border: none;
  border-radius: 0.5rem;
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: 1px solid #89939e;
  }
`;

export const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24.2px;
  font-family: Inter;
`;
