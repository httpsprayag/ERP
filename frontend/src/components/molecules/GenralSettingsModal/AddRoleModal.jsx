import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Divider } from '@mui/material';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';

export const AddRoleModal = ({ open, onClose, handleRoleSubmit }) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
    initialValues: {
      roleName: '',
    },
    validationSchema: Yup.object({
      roleName: Yup.string('Role name should be in string').required('Role name is required'),
    }),
    onSubmit: () => {
      handleRoleSubmit(values?.roleName);
      resetForm();
    },
  });

  return (
    <CustomModal
      title='ADD NEW ROLE'
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
            id='roleName'
            name='roleName'
            label='Role Name'
            placeholder='Role Name'
            value={values.roleName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.roleName && touched.roleName}
            helperText={errors.roleName && touched.roleName ? errors.roleName : ''}
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
