import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomModal from '../../atoms/CustomModal';
import CustomButton from '../../atoms/CustomButton';

const DeleteFieldModal = ({ deleteModalOpen, handleDeleteModalClose, handleDelete, field, fieldName }) => (
  <>
    <CustomModal open={deleteModalOpen} onClose={handleDeleteModalClose}>
      <Box display='grid' gap={2} padding={3} maxHeight={215}>
        <Box width='100%' display='flex' alignItems='center' justifyContent='space-between'>
          <Typography fontSize={20} fontWeight={800} color='#212121' lineHeight='24.2px' fontFamily='Inter'>
            {`Delete ${fieldName}`}
          </Typography>
          <CloseIcon onClick={handleDeleteModalClose} sx={{ cursor: 'pointer', width: 24, height: 24 }} />
        </Box>
        <Divider color='#89939E' />
        <Typography fontWeight={500} fontSize={16} lineHeight='24px' fontFamily='Inter'>
          {`Do you really want to delete this ${fieldName}?`}
        </Typography>
        <Box display='flex' alignItems='center' gap={2} justifyContent='end' mt='20px'>
          <CustomButton onClick={handleDeleteModalClose} width={131} variant='outlined' bg='transparent'>
            Cancel
          </CustomButton>
          <CustomButton width={131} onClick={(e) => handleDelete(e, field.id)}>
            Delete
          </CustomButton>
        </Box>
      </Box>
    </CustomModal>
  </>
);

export default DeleteFieldModal;
