import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Divider } from '@mui/material';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField, StyledTextarea } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';

export const AddFieldModal = ({ open, handleClose, handleFieldSubmit }) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
    initialValues: {
      name: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().strict().typeError('Name must be a string').required('Name is required.'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: () => {
      handleFieldSubmit(values, 'create');
      resetForm();
    },
  });
  return (
    <CustomModal
      title='ADD NEW FIELD'
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

          <StyledTextarea
            fullWidth
            id='address'
            label='Address'
            placeholder='Address'
            value={values.address}
            name='address'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address && touched.address}
            helperText={errors.address && touched.address ? errors.address : ''}
            multiline
            rows={4}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
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
