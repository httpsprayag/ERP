import React, { useEffect, useState } from 'react';
import { IconButton, InputAdornment, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Login, LoginContainer, LoginForm } from './style';
import { API_STATUS, pixelToRem } from '../../utils';
import CustomButton from '../../components/atoms/CustomButton';
import { userLogin } from '../../api/login';
import { resetUser } from '../../redux/features/auth/authSlice';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();

  const { loginApiStatus, isLoggedIn, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      <Navigate to='/home' />;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginApiStatus === API_STATUS.fail) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      dispatch(resetUser());
    }
  }, [loginApiStatus]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(userLogin({ email: values.email, password: values.password }));
      resetForm();
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <LoginContainer>
      <Login>
        <Typography sx={{ fontWeight: 600, fontSize: 24, color: '#212121', fontFamily: 'Inter, sans-serif' }}>
          Login
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#89939E', fontFamily: 'Inter, sans-serif' }}>
          Login with email used to invite you to the company
        </Typography>
        <LoginForm onSubmit={formik.handleSubmit}>
          <Typography sx={{ fontSize: 16, lineHeight: '1.5rem', fontWeight: 500, color: '#212121' }}>
            Enter mail
          </Typography>
          <TextField
            disabled={formik.isSubmitting}
            fullWidth
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : ''}
            sx={{
              borderRadius: '0.5rem',
              height: pixelToRem(34),
              marginBottom: '1rem',
            }}
          />
          <Typography
            sx={{
              lineHeight: pixelToRem(24),
              fontWeight: 500,
              color: '#212121',
              mt: formik.touched.email && formik.errors.email ? '1rem' : '0',
            }}>
            Enter Password
          </Typography>
          <TextField
            disabled={formik.isSubmitting}
            fullWidth
            id='password'
            name='password'
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ''}
            sx={{
              borderRadius: '0.5rem',
              height: pixelToRem(34),
              marginBottom: '1rem',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomButton disabled={loginApiStatus === API_STATUS.pending} type='submit' sx={{ mt: pixelToRem(19) }}>
            Login
          </CustomButton>
        </LoginForm>
      </Login>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LoginContainer>
  );
};
