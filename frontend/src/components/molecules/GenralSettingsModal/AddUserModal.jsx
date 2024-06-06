import React from 'react';
import { Box, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';
import { CustomDropdown } from '../../atoms/CustomDropdown';

export const AddUsermodal = ({ open, handleClose, warehouseData, roleData, handleAllSubmit }) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched, setFieldValue, resetForm } = useFormik({
    initialValues: {
      name: '',
      email: '',
      contactNumber: '',
      password: '',
      warehouseId: '',
      roleId: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().strict().typeError('Name must be a string').required('Name is required.'),
      email: Yup.string()
        .typeError('Email must be a string')
        .email('Please enter valid email')
        .required('Email is required'),
      contactNumber: Yup.string()
        .matches(/^(\+|\d)+$/, 'Contact Number format is incorrect')
        .required('Contact number is required'),
      password: Yup.string().strict().typeError('Password must be a string').required('Password is required'),
      warehouseId: Yup.string().required('Warehouse is required'),
      roleId: Yup.string().required('Role is required'),
    }),
    onSubmit: () => {
      handleAllSubmit(values, 'create');
      resetForm();
    },
  });

  return (
    <CustomModal
      title='ADD NEW USER'
      closeIcon
      onClose={() => {
        resetForm();
        handleClose();
      }}
      open={open}>
      <form onSubmit={handleSubmit}>
        <Box display='grid' gap={3} p={5} pt={3} alignItems='center'>
          <StyledTextField
            size='small'
            fullWidth
            id='name'
            name='name'
            label='Name'
            placeholder='Name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
            helperText={errors.name && touched.name ? errors.name : ''}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />

          <StyledTextField
            size='small'
            fullWidth
            id='email'
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && Boolean(touched.email)}
            helperText={errors.email && touched.email ? errors.email : ''}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />

          <StyledTextField
            size='small'
            fullWidth
            id='contactNumber'
            name='contactNumber'
            label='Conatct Number'
            placeholder='Contact number'
            value={values.contactNumber}
            onChange={(e) => {
              handleChange(e);
            }}
            error={touched.contactNumber && Boolean(errors.contactNumber)}
            helperText={touched.contactNumber ? errors.contactNumber : ''}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />

          <StyledTextField
            size='small'
            fullWidth
            id='password'
            name='password'
            label='Password'
            placeholder='Password'
            value={values.password}
            onChange={(e) => {
              handleChange(e);
            }}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password ? errors.password : ''}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />

          <CustomDropdown
            id='warehouse'
            name='warehouse'
            fieldName='warehouseName'
            label='Warehouse Selection'
            options={warehouseData}
            value={values.warehouseId}
            onChange={(e, value) => {
              setFieldValue('warehouseId', value?.id);
            }}
            onBlur={handleBlur}
            error={errors.warehouseId && touched.warehouseId}
            helperText={touched.warehouseId ? errors.warehouseId : ''}
          />

          <CustomDropdown
            id='roleId'
            name='roleId'
            fieldName='roleName'
            label='Role selection'
            options={roleData}
            value={values.roleId}
            onChange={(e, value) => {
              setFieldValue('roleId', value?.id);
            }}
            onBlur={handleBlur}
            error={errors.roleId && touched.roleId}
            helperText={touched.roleId ? errors.roleId : ''}
          />

          <Divider color='#89939E' />
          <Box display='flex' alignItems='center' gap={2} justifyContent='end'>
            <CustomButton
              onClick={() => {
                resetForm();
                handleClose();
              }}
              width={131}
              variant='outlined'
              bg='transparent'>
              Cancel
            </CustomButton>
            <CustomButton width={131} type='submit'>
              Add
            </CustomButton>
          </Box>
        </Box>
      </form>
    </CustomModal>
  );
};
