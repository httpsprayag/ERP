import { styled, MenuItem, Menu, Box, TextField } from '@mui/material';
import { pixelToRem } from '../../../utils';

export const StyledHeader = styled(Box)`
  display: flex;
  padding: 1.5rem;
  position: sticky;
  z-index: 30;
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  gap: 16px;
  align-items: center;
  max-height: 3rem;
  justify-content: flex-end;
  .css-6hp17o-MuiList-root-MuiMenu-list {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const StyledMenu = styled(Menu)`
  padding: 0;
  border: none;
  top: ${pixelToRem(31)};
  border-radius: 0.5rem;
  .MuiList-padding {
    padding-top: 0;
    padding-bottom: 0;
  }
  fieldset {
    border: none;
  }
`;

export const LogoutBtn = styled(MenuItem)`
  padding: '10px, 14px, 10px, 14px';
  color: '#212121';
  border-bottom: '0.5px solid #89939E';
  padding-top: ${pixelToRem(10)};
  padding-bottom: ${pixelToRem(10)};
  max-height: '39px';
  padding-left: ${pixelToRem(14)};
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
`;

export const ChangePasswordBtn = styled(MenuItem)`
  padding: '10px, 14px, 10px, 14px';
  color: '#212121';
  border-bottom: 0.5px solid #89939e;
  padding-left: 14px;
  max-height: '39px';
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
`;

export const ProfileButton = styled(MenuItem)`
  padding: '10px, 14px, 10px, 14px';
  padding-top: 26px;
  padding-left: 14px;
  color: #212121;
  max-height: 55px;
  border-bottom: 0.5px solid #89939e;
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
`;

export const StyledTextField = styled(TextField)`
  max-height: 40px;
  max-width: 350px;
  padding: 0;
  border-radius: 0.5rem;
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: 1px solid #89939e;
  }
`;
