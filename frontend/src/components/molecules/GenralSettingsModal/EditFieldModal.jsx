import React from 'react';
import { Box, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField, StyledTextarea } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';

const EditFieldModal = ({ editModalIsOpen, handleEditModalClose, field, handleUpdate }) => {
  const formik = useFormik({
    initialValues: {
      name: field.name,
      address: field.address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleUpdate(values, 'update', field?.id);
      resetForm();
    },
  });

  return (
    <>
      <CustomModal title='EDIT FIELD' closeIcon onClose={handleEditModalClose} open={editModalIsOpen}>
        <form onSubmit={formik.handleSubmit}>
          <Box display='grid' gap={3} p={5} pt={3} alignItems='center'>
            <StyledTextField
              size='small'
              fullWidth
              id='name'
              name='name'
              label='name'
              placeholder='Name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : ''}
              InputLabelProps={{
                style: { color: '#89939E' },
              }}
            />

            <StyledTextarea
              fullWidth
              placeholder='Address'
              name='address'
              value={formik.values.address}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.errors.address && formik.touched.address ? formik.errors.address : ''}
              multiline
              rows={4}
              InputLabelProps={{
                style: { color: '#89939E' },
              }}
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

export default EditFieldModal;
