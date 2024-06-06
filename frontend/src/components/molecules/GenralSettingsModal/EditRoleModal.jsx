import React from 'react';
import { Box, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../../atoms/CustomModal';
import { StyledTextField } from '../../../pages/GeneralSettings/style';
import CustomButton from '../../atoms/CustomButton';

const EditRoleModal = ({ editModalIsOpen, handleEditModalClose, field, handleUpdate }) => {
  const formik = useFormik({
    initialValues: {
      roleName: field.name,
      userCount: field.userCount,
    },
    validationSchema: Yup.object({
      roleName: Yup.string('Role name should be in string').required('Role name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleUpdate(values, 'update', field?.id);
      resetForm();
    },
  });

  return (
    <>
      <CustomModal title='UPDATE ROLE' closeIcon onClose={handleEditModalClose} open={editModalIsOpen}>
        <form onSubmit={formik.handleSubmit}>
          <Box display='grid' gap={3} p={5} pt={3} alignItems='center'>
            <StyledTextField
              size='small'
              fullWidth
              id='roleName'
              name='roleName'
              label='Role Name'
              placeholder='Role Name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.roleName}
              error={formik.touched.roleName && Boolean(formik.errors.roleName)}
              helperText={formik.errors.roleName ? <span style={{ color: 'red' }}>{formik.errors.roleName}</span> : ''}
              InputLabelProps={{
                style: { color: '#89939E' },
              }}
            />

            <StyledTextField
              disabled
              size='small'
              fullWidth
              id='userCount'
              name='userCount'
              label='User Count'
              placeholder='User Count'
              value={formik.values.userCount}
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

export default EditRoleModal;
