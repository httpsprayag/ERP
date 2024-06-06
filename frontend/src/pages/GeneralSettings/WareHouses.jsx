import React, { useEffect, useReducer, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { DELETE, GET, POST, PUT } from '../../utils/api';
import CustomDataTable from '../../components/molecules/DataTable';
import CustomButton from '../../components/atoms/CustomButton';
import { AddFieldModal } from '../../components/molecules/GenralSettingsModal/AddFieldModal';
import EditFieldModal from '../../components/molecules/GenralSettingsModal/EditFieldModal';
import DeleteFieldModal from '../../components/molecules/GenralSettingsModal/DeleteFieldModal';

const wareHouseDataMatcher = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Address', accessor: 'address' },
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

export const WareHouses = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isEditOpen, isDeleteOpen } = state;
  const [warehouseList, setWarehouseList] = useState([]);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState({
    name: '',
    address: '',
    id: null,
  });
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const closePoper = () => {
    setAnchorEl(null);
  };

  const handleCloseError = () => {
    setMessage(null);
  };

  const handleOpen = () => {
    setField({ name: '', address: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setField({ name: '', address: '' });
    setOpen(false);
  };

  const handleMoreIconClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setField({
      address: row.address,
      name: row.name,
      id: row.id,
    });
  };

  const handleLabelClick = (event) => {
    if (event === 'edit') {
      dispatch({ type: 'EDIT', payload: true });
    } else {
      dispatch({ type: 'DELETE', payload: true });
    }
  };

  const handleEditModalRemove = () => {
    dispatch({ type: 'EDIT', payload: false });
    setAnchorEl(null);
  };

  const handleDeleteModalRemove = () => {
    dispatch({ type: 'DELETE', payload: false });
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setOpen(false);
    dispatch({ type: 'EDIT', payload: false });
    dispatch({ type: 'DELETE', payload: false });
    setAnchorEl(null);
  };

  const fetchAllData = async () => {
    setLoading(true);
    const fetchData = await GET({ endpoint: 'api/v1/warehouses/read' });
    setWarehouseList(fetchData.result);
    setLoading(false);
    return null;
  };

  const handleOpration = async (opration, warehouseId, value) => {
    let createData;
    let updateData;
    let deleteData;

    try {
      switch (opration) {
        case 'create':
          if (!value.address || !value.name) {
            setMessage('Please Enter Valid Address or Warehouse Name');
            setSeverity('error');
            return;
          }
          createData = await POST({
            endpoint: 'api/v1/warehouses/write',
            data: {
              warehouseName: value.name,
              warehouseAddress: value.address,
            },
          });
          if (createData) {
            setSeverity('success');
            setMessage('Warehouse Added Successfully.');
            setLoading(true);
            handleModalClose();
            await fetchAllData();
          }
          setLoading(false);
          break;
        case 'update':
          if (!value.name.trim() || !value.address.trim()) {
            setMessage('Please Enter Valid Address or Warehouse Name');
            setSeverity('error');
            return;
          }
          updateData = await PUT({
            endpoint: `api/v1/warehouses/update/${warehouseId}`,
            data: {
              warehouseName: value.name,
              warehouseAddress: value.address,
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
            endpoint: `api/v1/warehouses/delete/${warehouseId}`,
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

  useEffect(() => {
    try {
      fetchAllData();
    } catch (error) {
      setSeverity('error');
      setMessage(error.message);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      ) : (
        <>
          <CustomButton onClick={handleOpen} sx={{ mt: 4, ml: 'auto' }}>
            Add New Field
          </CustomButton>
          <CustomDataTable
            tableName='WAREHOUSES'
            rows={warehouseList}
            columns={wareHouseDataMatcher}
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

      <AddFieldModal
        handleClose={handleClose}
        handleFieldSubmit={(value) => {
          handleOpration('create', '', value);
        }}
        open={open}
      />

      {isEditOpen && (
        <EditFieldModal
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
          handleDelete={() => handleOpration('delete', field?.id)}
          handleDeleteModalClose={handleDeleteModalRemove}
          fieldName='Field'
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
