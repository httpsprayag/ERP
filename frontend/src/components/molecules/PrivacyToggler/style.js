import { Box, styled, Backdrop } from '@mui/material';

export const TogglerContainer = styled(Box)`
  position: relative;
`;

export const TogglerBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${({ bg }) => bg || 'green'};
  border: 1px solid #717171;
  border-radius: 0.5rem;
  background-color: #ffffff;
  z-index: 20;
  position: relative;
`;

export const ToggleBox = styled(Box)(
  ({ fullWidth }) => `
  display: flex;
  align-items: center;
  padding: 10px;
  width: ${fullWidth ? '100%' : '288px'};
  border: 1px solid #717171;
  border-radius: 0.5rem;
  background-color: #ffffff;
  z-index: 20;
  right: 16px;
  `
);

export const StyledBackdrop = styled(Backdrop)`
  color: #fff;
  z-index: 10;
  background-color: rgba(33, 33, 33, 0.25);
  backdrop-filter: blur(10px);
  left: inherit;
  top: inherit;

  @media (min-width: 768px) {
    left: 240px;
    top: 6rem;
  }
`;
