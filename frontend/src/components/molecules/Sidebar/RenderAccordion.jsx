import { Fragment } from 'react';
import { Typography, Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RenderLink from './RenderLink';
import { StyledAccordionLink, StyledProfileBox } from './style';

const RenderAccordion = ({ link, handleClick, pathname, closeSidebar, open }) => {
  const key = `${link.menuId}-accordion`;
  return (
    <Fragment key={key}>
      <StyledAccordionLink link={link} pathname={pathname} disablePadding onClick={() => handleClick(link.menuId)}>
        {link.link === pathname && <StyledProfileBox />}
        <Typography
          sx={{
            fontSize: 16,
            mr: 'auto',
            lineHeight: '19.36px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: pathname === link.link ? 600 : 500,
          }}>
          {link.menuName}
        </Typography>
        {open === link.menuId ? <ExpandLess /> : <ExpandMore />}
      </StyledAccordionLink>
      <Collapse in={open === link.menuId} timeout='auto' unmountOnExit>
        <List component='div' disablePadding sx={{ pl: 4 }}>
          {link.children.map((child) =>
            child.children.length > 0 ? (
              <RenderAccordion key={child.menuId} link={child} />
            ) : (
              <RenderLink
                closeSidebar={closeSidebar}
                pathname={pathname}
                hidebar
                key={child.menuId}
                link={child}
                parentlink={link}
              />
            )
          )}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default RenderAccordion;
