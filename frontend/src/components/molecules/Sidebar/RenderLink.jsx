import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, StyledMenuList } from './style';
import { pixelToRem } from '../../../utils';

const RenderLink = ({ pathname, link, hidebar, parentlink, closeSidebar }) => {
  const key = parentlink ? `${parentlink.menuId}-${link.menuId}` : link.menuId;
  return (
    <NavLink
      component={Link}
      to={parentlink ? parentlink.link + link.link : link.link}
      key={key}
      onClick={closeSidebar}
      sx={{
        textDecoration: 'none',
        position: 'relative',
        color: pathname === link.link ? '#fff' : 'inherit',
      }}>
      <StyledMenuList link={link} pathname={pathname} parentlink={parentlink}>
        <Typography
          sx={{
            fontWeight: pathname === link.link ? 600 : 500,
            fontSize: 16,
            lineHeight: '19.36px',
            fontFamily: 'Inter, sans-serif',
            mr: 'auto',
          }}>
          {link.menuName}
        </Typography>
        {link.addIcon && <AddIcon sx={{ width: 24, height: 24, justifySelf: 'end' }} />}
      </StyledMenuList>
      {link.link === pathname && hidebar && (
        <Box
          sx={{
            position: 'absolute',
            width: pixelToRem(4),
            backgroundColor: '#ff2626',
            borderRadius: '0 0.5rem 0.5rem 0',
            top: 0,
            left: 0,
            bottom: 0,
          }}
        />
      )}
    </NavLink>
  );
};

export default RenderLink;
