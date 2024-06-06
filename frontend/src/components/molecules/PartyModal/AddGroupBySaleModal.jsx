import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Divider } from '@mui/material';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';

export const AddGroupBySale = ({ open, onClose, handleGroupBySaleSubmit }) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched, resetForm } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string('Group By Sale name should be in string').required('Group By Sale name is required'),
    }),
    onSubmit: () => {
      handleGroupBySaleSubmit(values?.name);
      resetForm();
    },
  });

  return (
    <CustomModal
      title='ADD NEW GROUP BY SALE'
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
            label='Group By Sale Name'
            placeholder='Group By Sale Name'
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
