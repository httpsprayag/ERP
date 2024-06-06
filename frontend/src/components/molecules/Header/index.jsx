import React, { useState } from 'react';
import { Box, Typography, MenuItem, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { pixelToRem } from '../../../utils';
import CustomButton from '../../atoms/CustomButton';
import { ChangePasswordBtn, LogoutBtn, ProfileButton, StyledHeader, StyledMenu } from './style';
import LogoutModal from './LogoutModal';
import ChangePasswordModal from './ChangePasswordModal';
import ProfileModal from './ProfileModal';

const Header = ({ setSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleProfileModalOpen = () => {
    setProfileModalOpen(true);
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleOpenLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledHeader>
      <MenuIcon
        onClick={() => setSidebarOpen(true)}
        sx={{ mr: 'auto', cursor: 'pointer', display: { xs: 'block', md: 'none' } }}
      />
      <CustomButton color='error' sx={{ color: '#fff', height: '3rem', display: 'flex', gap: pixelToRem(10) }}>
        <AddIcon sx={{ width: 20, height: 20 }} />
        <Typography sx={{ color: '#fff' }}>Add Sales</Typography>
      </CustomButton>
      <CustomButton sx={{ color: '#fff', height: '3rem', display: 'flex', gap: pixelToRem(10) }} color='error'>
        <AddIcon sx={{ width: 20, height: 20 }} />
        <Typography sx={{ color: '#fff' }}>Add Purchase</Typography>
      </CustomButton>
      <CustomButton
        bg='#EFEFEF'
        sx={{
          height: '3rem',
          display: 'flex',
          gap: pixelToRem(10),
          color: '#212121',
          border: '1px solid #212121',
        }}
        variant='outlined'>
        <AddIcon sx={{ width: 20, height: 20 }} />
        <Typography>Add More</Typography>
      </CustomButton>
      <Button
        endIcon={<Box component='img' src='/icons/menuIcon.svg' alt='down' sx={{ mt: pixelToRem(10) }} />}
        sx={{ backgroundColor: 'transparent' }}>
        <Box onClick={handleClick} component='img' src='/icons/setting.svg' sx={{ cursor: 'pointer' }} />
      </Button>
      <StyledMenu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={{ width: 200, height: 193, padding: '1rem', border: 'none', boxShadow: 'rgba(0, 0, 0, 0.08)' }}>
          <MenuItem
            disableGutters
            sx={{
              padding: '10px, 14px, 10px, 14px',
              color: '#89939E',
              maxHeight: 60,
              borderBottom: '1px solid #89939E',
              pb: 2,
              display: 'flex',
              gap: '1rem',
            }}
            onClick={handleClose}>
            <Box
              component='img'
              src='/icons/company.svg'
              sx={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '100%',
                backgroundColor: '#FF7777',
              }}
            />
            {isLoggedIn && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: pixelToRem(19.36),
                    color: '#212121',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                  Company Name
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: pixelToRem(16.94),
                    color: '#212121',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                  {user.result.name}
                </Typography>
              </Box>
            )}
          </MenuItem>
          <ProfileButton disableGutters onClick={handleProfileModalOpen}>
            My Profile
          </ProfileButton>
          <ChangePasswordBtn disableGutters onClick={handleOpenPasswordModal}>
            Change Password
          </ChangePasswordBtn>
          <LogoutBtn disableGutters onClick={handleOpenLogoutModal}>
            Logout
          </LogoutBtn>
        </Box>
      </StyledMenu>
      <LogoutModal handleClose={handleCloseLogoutModal} open={logoutModalOpen} />
      <ChangePasswordModal open={passwordModalOpen} handleClose={handleClosePasswordModal} />
      <ProfileModal open={profileModalOpen} handleClose={handleProfileModalClose} />
    </StyledHeader>
  );
};

export default Header;
