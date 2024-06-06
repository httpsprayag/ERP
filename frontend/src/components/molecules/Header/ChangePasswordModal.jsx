import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../atoms/CustomModal';
import CustomButton from '../../atoms/CustomButton';
import { StyledTextField } from './style';
import { POST } from '../../../utils/api';
import { persistor } from '../../../redux/store';

const ChangePasswordModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const { userId } = useSelector((state) => state.auth?.user?.result);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setMessage('');
    resetForm();
  }, [handleClose]);

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string().required('New password is required'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: async () => {
      try {
        const changePasswordApiResponse = await POST({
          endpoint: 'api/v1/users/password/change',
          data: { currentPassword: values.currentPassword, newPassword: values.newPassword, userId },
        });
        setSnackbarOpen(true);
        setSuccess(changePasswordApiResponse.success);
        setMessage(changePasswordApiResponse.message);
        if (changePasswordApiResponse.success) {
          handleLogout();
        }
      } catch (error) {
        setSnackbarOpen(true);
        setSuccess(false);
        setMessage(error.response.data.message || 'An error occurred while changing password.');
      }
      resetForm(); // Reset the form values after submission
    },
  });

  const handleLogout = async () => {
    navigate('/');
    return persistor.purge();
  };

  return (
    <CustomModal title='Change Password' open={open} onClose={handleClose}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={success ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <Box p={5} pt={3} display='flex' flexDirection='column' gap={5} fontFamily='Inter'>
          <StyledTextField
            type='password'
            placeholder='Current Password'
            name='currentPassword'
            label='Current Password'
            value={values.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.currentPassword && touched.currentPassword}
            helperText={errors.currentPassword && touched.currentPassword && errors.currentPassword}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />
          <StyledTextField
            type='password'
            placeholder='New Password'
            name='newPassword'
            label='New Password'
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.newPassword && touched.newPassword}
            helperText={errors.newPassword && touched.newPassword && errors.newPassword}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />
          <StyledTextField
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            label='Confirm Password'
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword && touched.confirmPassword}
            helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />
          <Box display='flex' justifyContent='space-between' width='100%' alignItems='center' gap={2} mt={1}>
            <CustomButton width={165} bg='#89939E' onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton width={165} type='submit'>
              Save Changes
            </CustomButton>
          </Box>
        </Box>
      </form>
    </CustomModal>
  );
};

export default ChangePasswordModal;
