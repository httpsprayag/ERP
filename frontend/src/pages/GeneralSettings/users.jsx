import React, { useEffect, useReducer, useState } from 'react';
import { Alert, CircularProgress, Snackbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomButton from '../../components/atoms/CustomButton';
import CustomDataTable from '../../components/molecules/DataTable';
import { DELETE, GET, POST, PUT } from '../../utils/api';
import DeleteFieldModal from '../../components/molecules/GenralSettingsModal/DeleteFieldModal';
import EditUserModal from '../../components/molecules/GenralSettingsModal/EditUserModal';
import { AddUsermodal } from '../../components/molecules/GenralSettingsModal/AddUserModal';

const userDataMatcher = [
  { Header: 'NAME', accessor: 'name' },
  { Header: 'EMAIL', accessor: 'email' },
  { Header: 'CONTACT NO', accessor: 'contactNumber' },
  { Header: 'WAREHOUSE  SELECTION', accessor: 'warehouseName' },
  { Header: 'ROLE SELECTION', accessor: 'roleName' },
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

export const Users = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isEditOpen, isDeleteOpen } = state;
  const [userDataList, setUserDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [warehouseData, setWarehouseData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [field, setField] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    warehouseId: '',
    roleId: '',
    id: null,
  });

  const handleLabelClick = (event) => {
    if (event === 'edit') {
      dispatch({ type: 'EDIT', payload: true });
    } else {
      dispatch({ type: 'DELETE', payload: true });
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/users/all' });
    setUserDataList(response.result);
    setLoading(false);
    return null;
  };

  const fetchWarehouseData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/warehouses/read' });
    setWarehouseData(response.result);
    setLoading(false);
    return null;
  };

  const fetchRoleData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/roles/all' });
    setRoleData(response.result);
    setLoading(false);
    return null;
  };

  const handleOpration = async (opration, userId, value) => {
    let createData;
    let updateData;
    let deleteData;

    try {
      switch (opration) {
        case 'create':
          if (
            !value.name.trim() ||
            !value.email.trim() ||
            !value.contactNumber.trim() ||
            !value.password.trim() ||
            !value.warehouseId ||
            !value.roleId
          ) {
            setMessage('Please Enter all valid field');
            setSeverity('error');
            return;
          }
          createData = await POST({
            endpoint: 'api/v1/users/create',
            data: {
              name: value.name,
              email: value.email,
              password: value.password,
              contactNumber: value.contactNumber,
              warehouseId: value.warehouseId,
              roleId: value.roleId,
            },
          });
          if (createData) {
            setSeverity('success');
            setMessage('User Added Successfully.');
            setLoading(true);
            handleModalClose();
            await fetchAllData();
          }
          setLoading(false);
          break;
        case 'update':
          if (
            !value.name.trim() ||
            !value.email.trim() ||
            !value.contactNumber.trim() ||
            !value.warehouseId ||
            !value.roleId
          ) {
            setMessage('Please Enter Valid Fileds');
            setSeverity('error');
            return;
          }
          updateData = await PUT({
            endpoint: `api/v1/users/update/${userId}`,
            data: {
              name: value.name,
              email: value.email,
              contactNumber: value.contactNumber,
              warehouseId: value.warehouseId,
              roleId: value.roleId,
            },
          });
          if (updateData) {
            setMessage(updateData.message);
            setSeverity('success');
            setLoading(true);
            handleModalClose();
            await fetchAllData();
          }
          setLoading(false);
          break;
        case 'delete':
          deleteData = await DELETE({
            endpoint: `api/v1/users/delete/${userId}`,
          });
          if (deleteData) {
            setMessage(deleteData.message);
            setSeverity('success');
            handleDeleteModalRemove();
            setLoading(true);
            handleModalClose();
            await fetchAllData();
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

  const handleMoreIconClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setField({
      name: row.name,
      email: row.email,
      password: row.password,
      contactNumber: row.contactNumber,
      warehouseId: row.warehouseId,
      roleId: row.roleId,
      id: row.id,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditModalRemove = () => {
    dispatch({ type: 'EDIT', payload: false });
    setAnchorEl(null);
  };

  const handleDeleteModalRemove = () => {
    dispatch({ type: 'DELETE', payload: false });
    setAnchorEl(null);
  };

  const closePoper = () => {
    setAnchorEl(null);
  };

  const handleCloseError = () => {
    setMessage(null);
  };

  const handleModalClose = () => {
    setOpen(false);
    dispatch({ type: 'EDIT', payload: false });
    dispatch({ type: 'DELETE', payload: false });
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllData();
        await fetchWarehouseData();
        await fetchRoleData();
      } catch (error) {
        setSeverity('error');
        setMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      ) : (
        <>
          <CustomButton
            onClick={handleOpen}
            color='error'
            sx={{ color: '#fff', height: '3rem', display: 'flex', mt: 4, ml: 'auto' }}>
            <AddIcon sx={{ width: 20, height: 20 }} />
            <Typography sx={{ color: '#fff' }}>Add New User</Typography>
          </CustomButton>
          <CustomDataTable
            tableName='USERS'
            rows={userDataList}
            columns={userDataMatcher}
            sx={{ mt: 4 }}
            labels={[
              { name: 'edit', label: 'Edit/View' },
              { name: 'delete', label: 'Delete' },
            ]}
            onLabelClick={handleLabelClick}
            moreIconOpen={handleMoreIconClick}
            anchorElement={anchorEl}
            closePoper={closePoper}
          />
        </>
      )}

      <AddUsermodal
        open={open}
        handleClose={handleClose}
        handleAllSubmit={(value) => {
          handleOpration('create', '', value);
        }}
        warehouseData={warehouseData}
        roleData={roleData}
      />

      {isEditOpen && (
        <EditUserModal
          editModalIsOpen={isEditOpen}
          field={field}
          handleEditModalClose={handleEditModalRemove}
          handleUpdate={(value) => {
            handleOpration('update', field?.id, value);
          }}
          warehouseData={warehouseData}
          roleData={roleData}
        />
      )}

      {isDeleteOpen && (
        <DeleteFieldModal
          deleteModalOpen={isDeleteOpen}
          field={field}
          handleDelete={() => handleOpration('delete', field?.id)}
          handleDeleteModalClose={handleDeleteModalRemove}
          fieldName='User'
        />
      )}

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseError}
        color='error'
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseError} severity={severity} variant='standard' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
