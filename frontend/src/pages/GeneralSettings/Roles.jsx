/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import Add from '@mui/icons-material/Add';
import CustomDataTable from '../../components/molecules/DataTable';
import CustomButton from '../../components/atoms/CustomButton';
import { DELETE, GET, POST, PUT } from '../../utils/api';
import { AddRoleModal } from '../../components/molecules/GenralSettingsModal/AddRoleModal';
import EditRoleModal from '../../components/molecules/GenralSettingsModal/EditRoleModal';
import DeleteFieldModal from '../../components/molecules/GenralSettingsModal/DeleteFieldModal';

const roleMatcher = [
  { Header: 'Role Name', accessor: 'name' },
  { Header: 'User Count', accessor: 'userCount' },
];

const initialState = {
  isEditOpen: false,
  isDeleteOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'EDIT':
      return {
        ...state,
        isEditOpen: action.payload,
      };
    case 'DELETE':
      return {
        ...state,
        isDeleteOpen: action.payload,
      };
    default:
      return state;
  }
};

export const RolesAndPermission = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isEditOpen, isDeleteOpen } = state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [field, setField] = useState({
    id: null,
    name: '',
    userCount: '',
  });

  const fetchAllRoles = async () => {
    setLoading(true);
    try {
      const rolesAndPermissions = await GET({ endpoint: 'api/v1/roles/all' });
      setData(rolesAndPermissions.result);
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  const handleMoreIconClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setField({
      id: row.id,
      name: row.name,
      userCount: row.userCount,
    });
  };

  const handleOpration = async (opration, roleId, value) => {
    let createData;
    let deleteData;
    let updateData;

    try {
      switch (opration) {
        case 'create':
          if (!value) {
            setMessage('Please Enter Valid Role Name');
            setSeverity('error');
            return;
          }
          createData = await POST({
            endpoint: 'api/v1/roles/create',
            data: {
              name: value,
            },
          });
          if (createData) {
            setSeverity('success');
            setMessage('Role Added Successfully.');
            setLoading(true);
            handleModalClose();
            await fetchAllRoles();
          }
          setLoading(false);
          break;
        case 'update':
          if (!value) {
            setMessage('Please Enter Valid Role Name');
            setSeverity('error');
            return;
          }
          updateData = await PUT({
            endpoint: `api/v1/roles/update/${roleId}`,
            data: {
              name: value.roleName,
            },
          });
          if (updateData) {
            setSeverity('success');
            setMessage('Role Updated Successfully.');
            handleEditModalRemove();
            setLoading(true);
            handleModalClose();
            await fetchAllRoles();
          }
          setLoading(false);
          break;
        case 'delete':
          deleteData = await DELETE({
            endpoint: `api/v1/roles/delete/${roleId}`,
          });
          if (deleteData) {
            setMessage(deleteData.message);
            setSeverity('success');
            handleDeleteModalRemove();
            setLoading(true);
            await fetchAllRoles();
          }
          setLoading(false);
          break;
        default:
          throw new Error('Invalid operation');
      }
    } catch (error) {
      setLoading(false);
      setSeverity('error');
      setMessage(error.response.data.message || error.message || 'Something Went to Wrong!!');
      handleModalClose();
    }
  };

  const handleCloseAlert = () => setMessage(null);

  const handleModalOpen = () => setOpen(true);

  const handleModalClose = () => setOpen(false);

  const handleLabelClick = (event) => {
    if (event === 'setPermission') {
      navigate(`/general-settings/set-permissions/${field?.id}`);
    } else if (event === 'edit') {
      dispatch({ type: 'EDIT', payload: true });
    } else {
      dispatch({ type: 'DELETE', payload: true });
    }
  };

  const closePoper = () => {
    setAnchorEl(null);
  };

  const handleEditModalRemove = () => {
    dispatch({ type: 'EDIT', payload: false });
    setAnchorEl(null);
  };

  const handleDeleteModalRemove = () => {
    dispatch({ type: 'DELETE', payload: false });
    setAnchorEl(null);
  };

  useEffect(() => {
    try {
      fetchAllRoles();
    } catch (error) {
      setSeverity('error');
      setMessage(error.message);
    }
  }, []);

  return (
    <>
      <Box display='flex' justifyContent='end'>
        <CustomButton onClick={handleModalOpen}>
          <Add />
          <Typography fontFamily='Inter'>ROLES & PERMISSIONS</Typography>
        </CustomButton>
      </Box>
      {loading ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      ) : (
        <CustomDataTable
          tableName='ROLES & PERMISSIONS'
          columns={roleMatcher}
          rows={data}
          sx={{ mt: 4 }}
          labels={[
            { name: 'setPermission', label: 'Set Permission' },
            { name: 'edit', label: 'View/Edit' },
            { name: 'delete', label: 'Delete' },
          ]}
          onLabelClick={handleLabelClick}
          moreIconOpen={handleMoreIconClick}
          anchorElement={anchorEl}
          closePoper={closePoper}
        />
      )}

      <AddRoleModal
        onClose={handleModalClose}
        open={open}
        handleRoleSubmit={(value) => {
          handleOpration('create', '', value);
        }}
      />

      {isEditOpen && (
        <EditRoleModal
          editModalIsOpen={isEditOpen}
          field={field}
          handleEditModalClose={handleEditModalRemove}
          handleUpdate={(value) => handleOpration('update', field?.id, value)}
        />
      )}

      {isDeleteOpen && (
        <DeleteFieldModal
          deleteModalOpen={isDeleteOpen}
          field={field}
          handleDelete={() => {
            handleOpration('delete', field?.id);
          }}
          handleDeleteModalClose={handleDeleteModalRemove}
          fieldName='Role'
        />
      )}

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        color='error'
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity={severity} variant='standard' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
