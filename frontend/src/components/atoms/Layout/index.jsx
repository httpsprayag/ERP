import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../molecules/Header';
import Sidebar from '../../molecules/Sidebar';
import { API_STATUS } from '../../../utils';
import { LayoutContainer, ScrollableBox } from './style';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loginApiStatus } = useSelector((state) => state.auth);
  return (
    <LayoutContainer>
      {loginApiStatus === API_STATUS.pending ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      ) : (
        <>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <ScrollableBox>
            <Header setSidebarOpen={setSidebarOpen} />
            <Outlet />
          </ScrollableBox>
        </>
      )}
    </LayoutContainer>
  );
};

export default Layout;
