import { Autocomplete, styled } from '@mui/material';

export const StyledCustomDropdown = styled(Autocomplete)`
  width: 100%;
  max-height: 40px;
  padding: 0;

  & .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    transform: translate(14px, 10px) scale(1);
  }

  & .MuiInputBase-input {
    padding: 0 !important;
  }
`;
