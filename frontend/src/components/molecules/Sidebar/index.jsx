import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import { pixelToRem } from '../../../utils';
import RenderLink from './RenderLink';
import RenderAccordion from './RenderAccordion';
import { NavLink, SidebarContainer } from './style';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const findOpenAccordion = (menus) => {
      const stack = [...menus];
      while (stack.length) {
        const menu = stack.pop();
        if (menu.children.length > 0) {
          if (pathname.startsWith(menu.link)) {
            setOpenAccordion(menu.menuId);
            return;
          }
          stack.push(...menu.children);
        }
      }
    };

    if (user && user.result && user.result.accessibleMenus) {
      findOpenAccordion(user.result.accessibleMenus);
    }
  }, [pathname, user]);

  const handleClickAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const sidebarContent = (
    <SidebarContainer disablePadding>
      <NavLink
        to='/home'
        component={Link}
        onClick={closeSidebar}
        sx={{
          py: '24px',
          fontWeight: 500,
          color: '#FF2626',
          lineHeight: pixelToRem(19.36),
          fontSize: '20px',
          fontFamily: "'Inter', sans-serif",
          textDecoration: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}>
        Company
      </NavLink>
      {user?.result?.accessibleMenus?.map((menu) =>
        menu.children.length > 0 ? (
          <RenderAccordion
            key={menu.menuId}
            link={menu}
            closeSidebar={closeSidebar}
            open={openAccordion}
            handleClick={handleClickAccordion}
            pathname={pathname}
          />
        ) : (
          <RenderLink hidebar key={menu.menuId} link={menu} closeSidebar={closeSidebar} pathname={pathname} />
        )
      )}
    </SidebarContainer>
  );

  const drawer = (
    <Drawer
      anchor='left'
      open={sidebarOpen}
      onClose={closeSidebar}
      ModalProps={{ keepMounted: true }}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': {
          width: '16rem',
        },
        display: { xs: 'block', md: 'none' },
      }}>
      {sidebarContent}
    </Drawer>
  );

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
        }}>
        {sidebarContent}
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
        }}>
        {drawer}
      </Box>
    </>
  );
}

export default Sidebar;
