/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material';
import SideTable from '../../components/molecules/SideTable';
import CollapsibleTable from '../../components/molecules/collapseTable';
import { GET } from '../../utils/api';
import { StyledTypography } from './style';

const tableColumn = [
  { Header: 'Type', accessor: 'type' },
  { Header: 'Number', accessor: 'number' },
  { Header: 'Date', accessor: 'date' },
  { Header: 'Total', accessor: 'total' },
  { Header: 'Balance', accessor: 'balance' },
];

const collapseTableColumn = [
  { Header: 'Item Name', accessor: 'itemName' },
  { Header: 'Quantity', accessor: 'quantity' },
  { Header: 'Rate', accessor: 'rate' },
];

export const PartyPage = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [partyData, setPartyData] = useState([]);
  // eslint-disable-next-line
  const [message, setMessage] = useState();
  // eslint-disable-next-line
  const [severity, setSeverity] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const fetchPartyData = async () => {
    setLoading(true);
    const data = await GET({ endpoint: 'api/v1/party/list' });
    setPartyData(data.result);
    setLoading(false);
    return null;
  };

  const fetchTransactionData = async (id) => {
    setLoading(true);
    if (id !== undefined) {
      const data = await GET({ endpoint: `api/v1/party/transaction/${id}` });
      setTransactionList(data.result);
    }
    setLoading(false);
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPartyData();
        await fetchTransactionData();
      } catch (error) {
        setSeverity('error');
        setMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} md={5} lg={3.6}>
          <Box
            component={Card}
            fontFamily='Inter'
            p={2}
            height='93px'
            borderRadius={1}
            elevation={0}
            boxShadow='0px 4px 25px 0px #00000014'
            display='flex'
            gap={2}>
            <img src='./icons/telephone.svg' alt='expense' width={24} height={24} />
            <Box fontFamily='Inter' display='flex' flexDirection='column' gap={1}>
              <StyledTypography>Import Parties</StyledTypography>
              <StyledTypography>Use contacts from your Phone or Gmail to create parties.</StyledTypography>
            </Box>
          </Box>
          <Box marginTop='16px' width='100%'>
            <SideTable
              width='100%'
              partyData={partyData}
              onSelectData={(data) => {
                setSelectedData(data);
                fetchTransactionData(data?.partyId);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6} md={7} lg={8.4}>
          <Box
            component={Card}
            fontFamily='Inter'
            height='93px'
            p={2}
            borderRadius={1}
            elevation={0}
            boxShadow='0px 4px 25px 0px #00000014'
            display='flex'
            flexDirection='column'
            gap={2}>
            <Typography fontWeight={600} fontSize='18px'>
              {selectedData?.partyName}
            </Typography>
            <Box display='flex' flexDirection='column' gap={1}>
              <Box display='flex' justifyContent='space-between'>
                <StyledTypography>Phone : {selectedData?.number}</StyledTypography>
                <StyledTypography>Address : {selectedData?.address}</StyledTypography>
              </Box>
              <StyledTypography>No Credit Limit Set : {selectedData?.creditLimit}</StyledTypography>
            </Box>
          </Box>
          <Box sx={{ mt: '16px' }}>
            {loading ? (
              <CircularProgress
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
            ) : (
              <CollapsibleTable
                tableName='Transaction'
                tableRow={transactionList}
                column={tableColumn}
                collapseColumn={collapseTableColumn}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
