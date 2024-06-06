import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Checkbox, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import { GET, PUT } from '../../utils/api';
import PermissionCard from '../../components/molecules/PermissionCard';
import CustomButton from '../../components/atoms/CustomButton';

const EditPermissions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('');

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { result } = await GET({ endpoint: `api/v1/roles/permissions/${id}` });
        const defaultCheckedIds = result.flatMap((item) =>
          item.permissions.filter((permission) => permission.isChecked).map((permission) => permission.id)
        );
        setData(
          result.map((item) => ({
            ...item,
            permissions: item.permissions.map((permission) => ({
              ...permission,
              selected: defaultCheckedIds.includes(permission.id),
            })),
          }))
        );
        setSelectedIds(defaultCheckedIds);
        setLoading(false);
      } catch (err) {
        setSnackbarOpen(true);
        setSnackbarMessage(err.message);
        setSeverity('error');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSingleCheckBox = (pId) => {
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        permissions: item.permissions.map((permission) => {
          if (permission.id === pId) {
            return { ...permission, isChecked: !permission.isChecked };
          }
          return permission;
        }),
      }))
    );

    setSelectedIds((prevIds) => {
      if (prevIds.includes(pId)) {
        return prevIds.filter((idx) => idx !== pId);
      }
      return [...prevIds, pId];
    });
  };

  const handleSelectAllChange = (isChecked) => {
    const allIds = data.flatMap((item) => item.permissions.map((permission) => permission.id));
    setSelectedIds(isChecked ? allIds : []);
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        permissions: item.permissions.map((permission) => ({
          ...permission,
          isChecked,
        })),
      }))
    );
  };

  const handleSaveAndUpdate = async () => {
    try {
      if (selectedIds.length === 0) {
        setSeverity('error');
        setSnackbarOpen(true);
        setSnackbarMessage('Please Select Atlest one permission');
        setData((prevData) =>
          prevData.map((item) => ({
            ...item,
            permissions: item.permissions.map((permission) => ({
              ...permission,
              isChecked: false,
            })),
          }))
        );
      } else {
        const response = await PUT({
          endpoint: `api/v1/roles/permissions/update`,
          data: { id, permissions: selectedIds },
        });
        setSnackbarMessage(response.message);
        setSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage('Failed to update permissions', err.message);
      setSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box py={6}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {data && (
        <Box display='flex' alignItems='center' justifyContent='space-between' mr={1}>
          <Typography fontSize={18} fontWeight={400} fontFamily='Inter'>
            Permission Management
          </Typography>
          <Box display='flex' alignItems='center'>
            <Checkbox
              aria-label='Select All'
              color='error'
              checked={
                selectedIds.length ===
                data.flatMap((item) => item.permissions.map((permission) => permission.id)).length
              }
              onChange={(e) => handleSelectAllChange(e.target.checked)}
            />
            <Typography>Select All</Typography>
            <CustomButton onClick={handleSaveAndUpdate} sx={{ ml: 3 }}>
              Save And Update
            </CustomButton>
          </Box>
        </Box>
      )}
      {!loading && !data && (
        <Box>
          <Typography>Data Not Found For This Specific Role, Role Id : {id}</Typography>
        </Box>
      )}
      {!loading ? (
        <Grid container spacing={2} mt={4}>
          {data &&
            data.map((item) => (
              <Grid key={item.menuID} item xs={12} sm={6} md={4} lg={3}>
                <PermissionCard
                  menuName={item.menuName}
                  permissions={item.permissions}
                  handleSingleCheckBox={handleSingleCheckBox}
                />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <CircularProgress color='error' />
        </Box>
      )}
    </Box>
  );
};

export default EditPermissions;
