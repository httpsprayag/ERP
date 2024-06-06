import { styled, Box } from '@mui/material';
export const LayoutContainer = styled(Box)`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const ScrollableBox = styled(Box)`
  position: relative;
  flex: 1;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    display: none;
    background-color: transparent;
    width: 0;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    width: 0;
  }
`;
