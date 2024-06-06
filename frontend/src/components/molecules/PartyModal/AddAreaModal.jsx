import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Divider } from '@mui/material';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';

export const AddArea = ({ open, onClose, handleAreaSubmit }) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string('Area name should be in string').required('Area name is required'),
    }),
    onSubmit: () => {
      handleAreaSubmit(values?.name);
      resetForm();
    },
  });

  return (
    <CustomModal
      title='ADD NEW AREA'
      closeIcon
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}>
      <form onSubmit={handleSubmit}>
        <Box display='grid' gap={3} p={5} pt={3} alignItems='center'>
          <StyledTextField
            size='small'
            fullWidth
            id='name'
            name='name'
            label='Area Name'
            placeholder='Area Name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
            helperText={errors.name && touched.name ? errors.name : ''}
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
          />

          <Divider color='#89939E' />
          <Box display='flex' alignItems='center' gap={2} justifyContent='end'>
            <CustomButton
              onClick={() => {
                resetForm();
                onClose();
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
