import React from 'react';
import { Box, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';
import { CustomDropdown } from '../../atoms/CustomDropdown';

const EditUserModal = ({ editModalIsOpen, handleEditModalClose, field, handleUpdate, warehouseData, roleData }) => {
  const formik = useFormik({
    initialValues: {
      name: field.name,
      email: field.email,
      contactNumber: field.contactNumber,
      warehouseId: field.warehouseId,
      roleId: field.roleId,
    },
    validationSchema: Yup.object({
      name: Yup.string().strict().typeError('Name must be a string').required('Name is required.'),
      email: Yup.string()
        .typeError('Email must be a string')
        .email('Please enter valid email')
        .required('Email is required'),
      contactNumber: Yup.string()
        .matches(/^(\+|\d)+$/, 'Contact number contain only numbers')
        .required('Contact number is required'),
      warehouseId: Yup.string().required('Warehouse is required'),
      roleId: Yup.string().required('Role is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleUpdate(values, field?.id);
      resetForm();
    },
  });

  return (
    <>
      <CustomModal title='UPDATE USER' closeIcon onClose={handleEditModalClose} open={editModalIsOpen}>
        <form onSubmit={formik.handleSubmit}>
          <Box display='grid' gap={3} p={5} pt={3} alignItems='center'>
            <StyledTextField
              size='small'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : ''}
              placeholder='Name'
              label='Name'
              name='name'
              InputLabelProps={{
                style: { color: '#89939E' },
              }}
            />
            <StyledTextField
              size='small'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email ? <span style={{ color: 'red' }}>{formik.errors.email}</span> : ''}
              placeholder='Email'
              label='Email'
              name='email'
              InputLabelProps={{
                style: { color: '#89939E' },
              }}
            />
            <StyledTextField
              size='small'
              placeholder='Contact number'
              label='Contact number'
              name='contactNumber'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={
                formik.errors.contactNumber ? <span style={{ color: 'red' }}>{formik.errors.contactNumber}</span> : ''
              }
              InputLabelProps={{
                style: { color: '#89939E' },
              }}
            />

            <CustomDropdown
              name='warehouse'
              fieldName='warehouseName'
              label='Warehouse Selection'
              options={warehouseData}
              value={formik.values.warehouseId}
              onChange={(e, values) => formik.setFieldValue('warehouseId', values?.id)}
              onBlur={formik.handleBlur}
              error={formik.touched.warehouseId && Boolean(formik.errors.warehouseId)}
              helperText={
                formik.errors.warehouseId ? <span style={{ color: 'red' }}>{formik.errors.warehouseId}</span> : ''
              }
            />

            <CustomDropdown
              fieldName='roleName'
              label='Role Selection'
              name='Role'
              options={roleData}
              onChange={(e, values) => formik.setFieldValue('roleId', values?.id)}
              onBlur={formik.handleBlur}
              value={formik.values.roleId}
              error={formik.touched.roleId && Boolean(formik.errors.roleId)}
              helperText={formik.errors.roleId ? <span style={{ color: 'red' }}>{formik.errors.roleId}</span> : ''}
            />

            <Divider color='#89939E' />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'end' }}>
              <CustomButton onClick={handleEditModalClose} width={131} variant='outlined' bg='transparent'>
                Cancel
              </CustomButton>
              <CustomButton width={131} type='submit'>
                Update
              </CustomButton>
            </Box>
          </Box>
        </form>
      </CustomModal>
    </>
  );
};

export default EditUserModal;
