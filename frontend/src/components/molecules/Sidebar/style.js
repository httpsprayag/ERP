/* eslint-disable no-nested-ternary */
import { styled, List, ListItem, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { pixelToRem } from '../../../utils';

export const NavLink = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  color: #212121;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  line-height: ${pixelToRem(19.36)};
`;

export const StyledMenuList = styled(List)(
  ({ pathname, parentlink, link }) => `
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: ${parentlink ? (pathname === parentlink.link + link.link ? '#FF2626' : 'inherit') : pathname === link.link ? '#FF2626' : 'inherit'};
  color: ${parentlink ? (pathname === parentlink.link + link.link ? '#FFF' : 'inherit') : pathname === link.link ? '#fff' : 'inherit'};
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  align-items: center;
  padding-left: 12px;
  padding-right: 24px;
  padding-top: 13px;
  padding-bottom: 13px;
  margin-left: 12px;
`
);

export const StyledAccordionLink = styled(ListItem)(
  ({ pathname, link }) => `
  display: 'flex';
  cursor: pointer;
  justify-content: space-between;
  position: relative;
  gap: 8px;
  padding: 13px 24px;
  cursor: pointer,
  background-color: ${pathname === link.link && '#FF2626'};
  border-radius: 0.5rem;
  color: pathname === link.link ? '#fff' : 'inherit';
`
);

export const StyledProfileBox = styled(Box)`
  position: 'absolute';
  width: ${pixelToRem(4)};
  background-color: '#ff2626';
  border-radius: '0 0.5rem 0.5rem 0';
  top: 0;
  left: -12px;
  bottom: 0;
  z-index: 10px;
`;

export const SidebarContainer = styled(List)`
  width: 15rem;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.1);
  height: 100vh;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: red white;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 5px;
    height: 5px;
  }

  @media screen and (max-width: 762px) {
    width: 16rem;
  }
`;
