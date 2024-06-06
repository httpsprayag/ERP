import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CustomDatePicker from '../../components/atoms/CustomDatePicker';
import { IOSSwitch, StyledBox, StyledHeadingTypography, StyledTextarea, StyledTypography } from './style';
import CustomButton from '../../components/atoms/CustomButton';
// import { CustomDropdown } from '../../components/atoms/CustomDropdown';
import { GET, POST } from '../../utils/api';
import { CustomModalDropdown } from '../../components/atoms/CustomModalDropDown';
// import { AddRoleModal } from '../../components/molecules/GenralSettingsModal/AddRoleModal';
import { AddGroupBySale } from '../../components/molecules/PartyModal/AddGroupBySaleModal';
import { AddArea } from '../../components/molecules/PartyModal/AddAreaModal';
import { AddCollection } from '../../components/molecules/PartyModal/AddCollectionByModal';
import { AddGroupByPurchase } from '../../components/molecules/PartyModal/AddGroupByPurchaseModal';

export const AddPartyPage = () => {
  const navigate = useNavigate();

  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, setFieldValue, resetForm } = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      contactNumber: '',
      address: '',
      isSubParty: false,
      subPartyBlocks: [{ name: '', status: false, balance: false, date: '', amount: '' }],
      areaTagId: '',
      collectionByTagId: '',
      partyGroupBySaleId: '',
      partyGroupByPurchaseId: '',
      partyBalanceIsReceivable: false,
      partyBalanceAmount: '',
      partyBalanceAsOnDate: '',
      creditLimit: '',
      partyStatus: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().strict().typeError('Name must be a string').required('Name is required.'),
      phoneNumber: Yup.string()
        .matches(/^(\+|\d)+$/, 'Contect Person format is incorrect')
        .required('Contact person is required'),
      contactNumber: Yup.string()
        .matches(/^(\+|\d)+$/, 'Contact number format is incorrect')
        .required('Contact number is required'),
      address: Yup.string().strict().typeError('Address should be in string').required('Address is required.'),
      isSubParty: Yup.boolean(),
      subPartyBlocks: Yup.array(),
      areaTagId: Yup.number().required('Area Tag Id is required').positive('Area Tag Id should be a positive number'),
      collectionByTagId: Yup.string().required('Collection is required'),
      partyGroupBySaleId: Yup.string().required('Party Group By Sale is required'),
      partyGroupByPurchaseId: Yup.string().required('Party Group By Purchased is required'),
      creditLimit: Yup.string()
        .matches(/^[0-9]+$/, 'Credit limit should contain only numbers')
        .required('Credit Limit is required'),
      partyBalanceAmount: Yup.string()
        .matches(/^[0-9]+$/, 'Party Balanced amount should contain only numbers')
        .required('Party Balanced amount is required'),
      partyBalanceAsOnDate: Yup.date()
        .required('Party balance as on date is required')
        .min(normalizeDate(new Date()), 'Party balance as on date must be today or in the future'),
      partyBalanceIsReceivable: Yup.boolean(),
      partyStatus: Yup.boolean(),
    }),

    onSubmit: () => {
      console.log(values);
      resetForm();
    },
  });

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [areaList, setAreaList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [groupBySale, setGroupBySale] = useState([]);
  const [groupByPurchase, setGroupByPurchase] = useState([]);
  const [isArea, setIsArea] = useState(false);
  const [isCollectionBy, setIsCollectionBy] = useState(false);
  const [isGroupBySale, setIsGroupBySale] = useState(false);
  const [isGroupByPurchase, setIsGroupByPurchase] = useState(false);

  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('success');

  const handlePrevPage = () => {
    navigate('/parties');
  };

  const handleAddSubParty = () => {
    setFieldValue('isSubParty', true);
    setFieldValue('subPartyBlocks', [
      ...values.subPartyBlocks,
      { name: '', status: false, balance: false, date: new Date(), amount: '' },
    ]);
  };

  const handleDeleteSubParty = (index) => {
    if (values.subPartyBlocks.length > 1) {
      const updatedSubPartyBlocks = [...values.subPartyBlocks];
      updatedSubPartyBlocks.splice(index, 1);

      setFieldValue('subPartyBlocks', updatedSubPartyBlocks);
    } else {
      setFieldValue('isSubParty', false);
      setFieldValue('subPartyBlocks', [{ name: '', status: false, balance: false, date: '', amount: '' }]);
    }
  };

  const handleSetField = () => {
    setFieldValue('subPartyBlocks', [{ name: '', status: false, balance: false, date: '', amount: '' }]);
  };

  /* Fetch Data */

  const fetchAreaData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/party/area/list' });
    setAreaList(response.result);
    setLoading(false);
    return null;
  };

  const fetchCollectionListData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/party/collection/list' });
    setCollectionList(response.result);
    setLoading(false);
    return null;
  };

  const fetchGroupBySaleData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/party/groupBySale/list' });
    setGroupBySale(response.result);
    setLoading(false);
    return null;
  };

  const fetchGroupByPurchaseData = async () => {
    setLoading(true);
    const response = await GET({ endpoint: 'api/v1/party/groupByPurchase/list' });
    setGroupByPurchase(response.result);
    setLoading(false);
    return null;
  };

  /* handle modal and add data */
  const handleAddAreaData = () => {
    setIsArea(true);
  };

  const handleAddCollectionByData = () => {
    setIsCollectionBy(true);
  };

  const handleAddGroupBySaleData = () => {
    setIsGroupBySale(true);
  };

  const handleAddGroupByPurchaseData = () => {
    setIsGroupByPurchase(true);
  };

  const handleAddAreaClose = () => {
    setIsArea(false);
  };

  const handleAddCollectionClose = () => {
    setIsCollectionBy(false);
  };

  const handleAddGroupBySaleClose = () => {
    setIsGroupBySale(false);
  };

  const handleAddGroupByPurchaseClose = () => {
    setIsGroupByPurchase(false);
  };

  const handleModalClose = () => {
    setIsArea(false);
    setIsCollectionBy(false);
    setIsGroupBySale(false);
    setIsGroupByPurchase(false);
  };

  const handleOpration = async (operation, value) => {
    let areaData;
    let collectionData;
    let groupBySaleData;
    let groupByPurchaseData;

    try {
      switch (operation) {
        case 'area':
          if (!value) {
            setMessage('Please Enter Valid Area Name');
            setSeverity('error');
            return;
          }
          areaData = await POST({
            endpoint: 'api/v1/party/area/add',
            data: {
              areaName: value,
            },
          });

          if (areaData) {
            setSeverity('success');
            setMessage('Area Added Successfully.');
            setLoading(true);
            handleAddAreaClose();
            await fetchAreaData();
          }
          setLoading(false);
          break;
        case 'collectionby':
          if (!value) {
            setMessage('Please Enter Valid Collection Name');
            setSeverity('error');
            return;
          }
          collectionData = await POST({
            endpoint: 'api/v1/party/collection/add',
            data: {
              collectionName: value,
            },
          });

          if (collectionData) {
            setSeverity('success');
            setMessage('Collection Added Successfully.');
            setLoading(true);
            handleAddCollectionClose();
            await fetchCollectionListData();
          }
          setLoading(false);
          break;
        case 'groupbysale':
          if (!value) {
            setMessage('Please Enter Valid Group By Sale Name');
            setSeverity('error');
            return;
          }
          groupBySaleData = await POST({
            endpoint: 'api/v1/party/groupBySale/add',
            data: {
              saleName: value,
            },
          });

          if (groupBySaleData) {
            setSeverity('success');
            setMessage('Group By Sale Added Successfully.');
            setLoading(true);
            handleAddGroupBySaleClose();
            await fetchGroupBySaleData();
          }
          setLoading(false);
          break;
        case 'groupbypurchase':
          if (!value) {
            setMessage('Please Enter Valid Group By Purchase Name');
            setSeverity('error');
            return;
          }
          groupByPurchaseData = await POST({
            endpoint: 'api/v1/party/groupByPurchase/add',
            data: {
              purchaseName: value,
            },
          });

          if (groupByPurchaseData) {
            setSeverity('success');
            setMessage('Group By Purchase Added Successfully.');
            setLoading(true);
            handleAddGroupByPurchaseClose();
            await fetchGroupByPurchaseData();
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

  const handleCloseError = () => {
    setMessage(null);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await fetchAreaData();
        await fetchCollectionListData();
        await fetchGroupBySaleData();
        await fetchGroupByPurchaseData();
      } catch (error) {
        setSeverity('error');
        setMessage(error.message);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <StyledBox component={Card} sx={{ overflow: 'scroll' }}>
        <form onSubmit={handleSubmit}>
          <KeyboardBackspaceIcon onClick={handlePrevPage} />
          <Box sx={{ marginTop: '1.5rem' }}>
            <StyledHeadingTypography sx={{ marginBottom: '1.5rem' }}>Add Party</StyledHeadingTypography>
            <Stack display='flex' direction='row' flexWrap='wrap' gap='24px'>
              <Grid container spacing={2} alignItems='center'>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    id='name'
                    label='Party Name *'
                    placeholder='Party Name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name ? errors.name : ''}
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    id='phoneNumber'
                    label='Contact Person *'
                    placeholder='Contact Person'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    id='contactNumber'
                    label='Contact Number *'
                    placeholder='Conatct Number'
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.contactNumber && touched.contactNumber}
                    helperText={errors.contactNumber && touched.contactNumber ? errors.contactNumber : ''}
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems='center'>
                <Grid item sm={12} md={6} lg={4}>
                  <StyledTextarea
                    fullWidth
                    id='address'
                    label='Address*'
                    placeholder='Address'
                    name='address'
                    multiline
                    rows={4}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.address && touched.address}
                    helperText={errors.address && touched.address ? errors.address : ''}
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{ marginTop: 3, overflow: 'hidden' }}>
              <Grid item lg={2} sx={{ alignContent: 'center' }}>
                <StyledTypography>
                  is Sub Party{' '}
                  <Checkbox
                    id='isSubParty'
                    checked={values.isSubParty}
                    onChange={handleChange}
                    onClick={handleSetField}
                  />
                </StyledTypography>
              </Grid>
              <Grid item lg={2}>
                <CustomButton opacity={!values.isSubParty && '0.5'} onClick={handleAddSubParty}>
                  <AddIcon sx={{ width: 20, height: 20 }} />
                  <Typography sx={{ color: '#fff' }}>Add Sub Party</Typography>
                </CustomButton>
              </Grid>
            </Grid>
          </Box>
          {values.isSubParty && (
            <Box sx={{ marginTop: 3 }}>
              <Grid>
                {values.subPartyBlocks.map((block, index) => (
                  <>
                    {/* eslint-disable-next-line */}
                    <Grid container spacing={2} columnSpacing={4} sx={{ marginY: 5 }}>
                      <Grid item sm={12} md={6} lg={4}>
                        <TextField
                          fullWidth
                          id={`name-${index}`}
                          name={`subPartyBlocks[${index}].name`}
                          label={`Sub Party Name ${index + 1}*`}
                          placeholder={`Sub Party Name ${index + 1}`}
                          value={block.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { color: '#89939E' },
                          }}
                        />
                      </Grid>
                      <Grid item sm={12} md={6} lg={4}>
                        <StyledTypography sx={{ fontSize: '16px' }}>Sub Party Status</StyledTypography>
                        <Stack direction='row' gap={2} marginTop={2}>
                          <IOSSwitch
                            id={`status-${index}`}
                            name={`subPartyBlocks[${index}].status`}
                            checked={block.status}
                            value={block.status}
                            onChange={handleChange}
                          />
                          <Typography color={block.status ? '#00DC82' : '#89939E'}>Active</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <StyledTypography sx={{ fontSize: '16px', marginTop: 2 }}>Sub Party Balance</StyledTypography>
                    <Grid container spacing={2} sx={{ marginY: 1 }}>
                      <Grid item sm={12} md={6} lg={3} sx={{ alignContent: 'center' }}>
                        <Stack direction='row' gap={2}>
                          <IOSSwitch
                            id={`balance-${index}`}
                            name={`subPartyBlocks[${index}].balance`}
                            checked={block.balance}
                            value={block.balance}
                            onChange={handleChange}
                          />
                          <Typography color={block.balance ? '#00DC82' : '#89939E'}>Active</Typography>
                        </Stack>
                      </Grid>
                      <Grid item sm={12} md={6} lg={3}>
                        <TextField
                          fullWidth
                          id={`amount-${index}`}
                          name={`subPartyBlocks[${index}].amount`}
                          label='Amount'
                          placeholder='Amount'
                          value={block.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { color: '#89939E' },
                          }}
                        />
                      </Grid>
                      <Grid item sm={12} md={6} lg={3}>
                        <CustomDatePicker
                          id={`date-${index}`}
                          name={`subPartyBlocks[${index}].date`}
                          label='As On Date'
                          value={block.date}
                          minDate={new Date()}
                          onChange={(date) => {
                            setFieldValue(
                              `subPartyBlocks[${index}].date`,
                              `${date.$y}-${date.$M + 1}-${date.$D}`,
                              true
                            );
                          }}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { color: '#89939E' },
                          }}
                        />
                      </Grid>
                      <Grid item sm={12} md={6} lg={2}>
                        <Button onClick={() => handleDeleteSubParty(index)}>
                          <img src='/icons/recycleBin.svg' width={50} height={50} alt='recycleBin' />
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          )}
          <Box>
            <Divider color='#89939E' sx={{ marginTop: 3, width: '100%' }} />
            <Grid container spacing={2} rowSpacing={5} sx={{ marginTop: 3 }}>
              <Grid item sm={12} md={6} lg={4}>
                <CustomModalDropdown
                  height='56px'
                  id='areaTagId'
                  name='areaTagId'
                  fieldName='areaTagId'
                  label='Area'
                  options={areaList}
                  value={values.areaTagId}
                  onChange={(e, value) => {
                    setFieldValue('areaTagId', value?.id);
                  }}
                  onBlur={handleBlur}
                  error={errors.areaTagId && touched.areaTagId}
                  helperText={touched.areaTagId ? errors.areaTagId : ''}
                  handleAddData={handleAddAreaData}
                />
              </Grid>
              <Grid item sm={12} md={6} lg={4}>
                <CustomModalDropdown
                  height='56px'
                  id='collectionByTagId'
                  name='collectionByTagId'
                  fieldName='collectionByTagId'
                  label='Collection By'
                  options={collectionList}
                  value={values.collectionByTagId}
                  onChange={(e, value) => {
                    setFieldValue('collectionByTagId', value?.id);
                  }}
                  onBlur={handleBlur}
                  error={errors.collectionByTagId && touched.collectionByTagId}
                  helperText={touched.collectionByTagId ? errors.collectionByTagId : ''}
                  handleAddData={handleAddCollectionByData}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item sm={12} md={6} lg={4}>
                <CustomModalDropdown
                  height='56px'
                  id='partyGroupBySaleId'
                  name='partyGroupBySaleId'
                  fieldName='partyGroupBySaleId'
                  label='Group By Sale'
                  options={groupBySale}
                  value={values.partyGroupBySaleId}
                  onChange={(e, value) => {
                    setFieldValue('partyGroupBySaleId', value?.id);
                  }}
                  onBlur={handleBlur}
                  error={errors.partyGroupBySaleId && touched.partyGroupBySaleId}
                  helperText={touched.partyGroupBySaleId ? errors.partyGroupBySaleId : ''}
                  handleAddData={handleAddGroupBySaleData}
                />
              </Grid>
              <Grid item sm={12} md={6} lg={4}>
                <CustomModalDropdown
                  height='56px'
                  id='partyGroupByPurchaseId'
                  name='partyGroupByPurchaseId'
                  fieldName='partyGroupByPurchaseId'
                  label='Group By Purchase'
                  options={groupByPurchase}
                  value={values.partyGroupByPurchaseId}
                  onChange={(e, value) => {
                    setFieldValue('partyGroupByPurchaseId', value?.id);
                  }}
                  onBlur={handleBlur}
                  error={errors.partyGroupByPurchaseId && touched.partyGroupByPurchaseId}
                  helperText={touched.partyGroupByPurchaseId ? errors.partyGroupByPurchaseId : ''}
                  handleAddData={handleAddGroupByPurchaseData}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 5 }}>
              <StyledTypography sx={{ fontSize: '16px', marginBottom: 3 }}>Party Balance</StyledTypography>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6} lg={3} sx={{ alignContent: 'center' }}>
                  <Stack direction='row' gap={2}>
                    <IOSSwitch
                      id='partyBalanceIsReceivable'
                      name='partyBalanceIsReceivable'
                      checked={values.partyBalanceIsReceivable}
                      value={values.partyBalanceIsReceivable}
                      onChange={handleChange}
                    />
                    <Typography color={!values.partyBalanceIsReceivable ? '#89939E' : '#00DC82'}>Receive</Typography>
                  </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={3}>
                  <TextField
                    fullWidth
                    id='partyBalanceAmount'
                    label='Amount'
                    placeholder='Amount'
                    value={values.partyBalanceAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.partyBalanceAmount && touched.partyBalanceAmount}
                    helperText={
                      errors.partyBalanceAmount && touched.partyBalanceAmount ? errors.partyBalanceAmount : ''
                    }
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={3}>
                  <CustomDatePicker
                    id='partyBalanceAsOnDate'
                    name='partyBalanceAsOnDate'
                    label='As On Date'
                    value={values.partyBalanceAsOnDate}
                    minDate={new Date()}
                    onChange={(date) => {
                      setFieldValue('partyBalanceAsOnDate', `${date.$y}-${date.$M + 1}-${date.$D}`, true);
                    }}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={3}>
                  <TextField
                    fullWidth
                    name='creditLimit'
                    id='creditLimit'
                    label='Credit Limit'
                    placeholder='Credit Limit'
                    value={values.creditLimit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.creditLimit && touched.creditLimit}
                    helperText={errors.creditLimit && touched.creditLimit ? errors.creditLimit : ''}
                    InputLabelProps={{
                      style: { color: '#89939E' },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <StyledTypography sx={{ fontSize: '16px' }}>Party Status</StyledTypography>
            <Grid container spacing={2} rowSpacing={5} justifyContent='space-between'>
              <Grid item lg={2} sx={{ alignContent: 'center' }}>
                <Stack direction='row' gap={2}>
                  <IOSSwitch
                    id='partyStatus'
                    name='partyStatus'
                    checked={values.partyStatus}
                    value={values.partyStatus}
                    onChange={handleChange}
                  />
                  <Typography color={!values.partyStatus ? '#89939E' : '#00DC82'}>Active</Typography>
                </Stack>
              </Grid>
              <Grid item sm={1.5}>
                <CustomButton isFUllWidth type='submit'>
                  <Typography sx={{ color: '#fff' }}>Save</Typography>
                </CustomButton>
              </Grid>
            </Grid>
          </Box>
        </form>
      </StyledBox>

      <AddArea
        onClose={handleAddAreaClose}
        open={isArea}
        handleAreaSubmit={(value) => {
          handleOpration('area', value);
        }}
      />

      <AddCollection
        onClose={handleAddCollectionClose}
        open={isCollectionBy}
        handleCollectionBySubmit={(value) => {
          handleOpration('collectionby', value);
        }}
      />

      <AddGroupBySale
        onClose={handleAddGroupBySaleClose}
        open={isGroupBySale}
        handleGroupBySaleSubmit={(value) => {
          handleOpration('groupbysale', value);
        }}
      />

      <AddGroupByPurchase
        onClose={handleAddGroupByPurchaseClose}
        open={isGroupByPurchase}
        handleGroupByPurchaseSubmit={(value) => {
          handleOpration('groupbypurchase', value);
        }}
      />

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
    </>
  );
};
