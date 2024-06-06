import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  Popover,
  Paper,
  MenuList,
  MenuItem,
  TableContainer,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyledTableCell, StyledTableSortLabel, StyledTableCellData, StyledBox, CustomTextField } from './style';

const SideTable = ({ partyData, onSelectData }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSelect = (row) => {
    setSelectedRow(row);
    onSelectData(row);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);
    const filteredData = partyData.filter((row) => {
      const mainRowData = Object.values(row)?.some((value) => {
        const strValue = String(value)?.toLowerCase();
        return strValue?.includes(searchText);
      });
      const collapseRowData = row.subParties?.some((item) =>
        Object.values(item)?.some((value) => {
          const strValue = String(value)?.toLowerCase();
          return strValue?.includes(searchText);
        })
      );
      return mainRowData || collapseRowData;
    });
    setFilteredRows(filteredData);
  };

  const handleSearchOpen = () => {
    setOpen(true);
  };

  const handleSearchClose = () => {
    setFilterText('');
    setFilteredRows(partyData);
    setOpen(false);
  };

  const onAddPartyOpen = () => {
    navigate('/parties/add-party');
  };

  useEffect(() => {
    setFilteredRows(partyData);
    if (partyData.length > 0) {
      setSelectedRow(partyData[0]);
      onSelectData(partyData[0]);
    }
  }, [partyData]);

  return (
    <StyledBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFF',
          zIndex: 20,
        }}>
        <Box
          gap='10px'
          sx={{
            padding: '10px',
            width: `${open ? '100%' : '20px'}`,
            height: '20px',
            borderRadius: '8px',
            border: '1px solid #89939E',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Box onClick={handleSearchOpen}>
            <img src='./icons/search.jpg' width={20} height={20} alt='search' />
          </Box>
          {open && (
            <Stack direction='row' width='100%' alignItems='center' justifyContent='space-between'>
              <CustomTextField
                variant='standard'
                size='small'
                placeholder='Search Party'
                value={filterText}
                onChange={handleFilterChange}
              />
              <CloseIcon onClick={handleSearchClose} style={{ height: '100%' }} />
            </Stack>
          )}
        </Box>
        {!open && (
          <Box sx={{ display: 'flex', alignItems: 'center', maxHeight: '40px', overflow: 'hidden' }}>
            <Button
              color='error'
              variant='contained'
              onClick={onAddPartyOpen}
              sx={{
                backgroundColor: '#FF2626',
                borderRadius: '8px 0 0 8px',
                height: '40px',
                width: '125px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
              }}>
              <AddIcon sx={{ fill: 'white', width: 20, height: 20 }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 500, lineHeight: '17px', fontFamily: 'Inter' }}>
                Add Party
              </Typography>
            </Button>
            <Box
              sx={{
                padding: '10px',
                borderRadius: '0 8px 8px 0',
                backgroundColor: 'rgba(255, 38, 38, 0.5)',
                display: 'grid',
              }}>
              <ExpandMoreIcon sx={{ width: 20, height: 20, fill: 'white' }} />
            </Box>
          </Box>
        )}
      </Box>
      <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
        <Table stickyHeader sx={{ boxShadow: 'none' }}>
          <TableHead sx={{ borderBottom: '1px solid #89939E' }}>
            <TableRow hover sx={{ maxHeight: '44px' }}>
              <StyledTableCell>
                <StyledTableSortLabel
                  sx={{ pl: 0, py: 0 }}
                  active={sortBy === 'type'}
                  direction={sortBy === 'type' ? sortDirection : 'asc'}
                  onClick={() => handleSort('type')}>
                  Party
                </StyledTableSortLabel>
              </StyledTableCell>
              <StyledTableCell sx={{ width: '170px', right: 0 }} align='center'>
                <StyledTableSortLabel
                  active={sortBy === 'amount'}
                  direction={sortBy === 'amount' ? sortDirection : 'asc'}
                  onClick={() => handleSort('amount')}>
                  Amount
                </StyledTableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <React.Fragment key={row.partyId}>
                <TableRow
                  onClick={() => handleSelect(row)}
                  color='yellow'
                  sx={{
                    cursor: 'pointer',
                    maxHeight: '44px',
                    backgroundColor: selectedRow === row ? 'rgba(255, 38, 38, 0.25)' : 'inherit',
                    ':hover': { backgroundColor: 'rgba(255, 38, 38, 0.25)' },
                  }}>
                  <StyledTableCellData align='center' sx={{ position: 'relative' }}>
                    <IconButton
                      sx={{ padding: 0, width: 24 }}
                      aria-label='expand'
                      size='small'
                      onClick={() => toggleRowExpansion(index)}>
                      {row.subParties.length > 0 &&
                        (expandedRows[index] ? (
                          <ExpandLessIcon sx={{ cursor: 'pointer', height: 22 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ cursor: 'pointer', height: 22 }} />
                        ))}
                    </IconButton>
                    {row.partyName}
                  </StyledTableCellData>
                  <StyledTableCellData align='right' sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <IconButton sx={{ padding: 0 }} aria-label='more' size='small' onClick={handlePopoverOpen}>
                      <MoreVertIcon sx={{ height: '15px' }} />
                    </IconButton>
                    ₹ {row.partyBalanceAmount}
                    <Popover
                      id='simple-popover'
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      sx={{ boxShadow: '#00000014' }}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                      PaperProps={{ elevation: 0 }}>
                      <MenuList disablePadding sx={{ padding: 1, width: '102px', height: '70px' }}>
                        <MenuItem
                          onClick={handlePopoverClose}
                          sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '16.94px' }}>
                          View/Edit
                        </MenuItem>
                        <MenuItem
                          onClick={handlePopoverClose}
                          sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '16.94px', mt: '4px' }}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Popover>
                  </StyledTableCellData>
                </TableRow>
                {expandedRows[index] &&
                  row.subParties &&
                  row.subParties.map((children) => (
                    <TableRow
                      key={children.subPartyId}
                      sx={{ ':hover': { backgroundColor: 'rgba(255, 38, 38, 0.25)' }, cursor: 'pointer' }}>
                      <StyledTableCellData align='right' sx={{ paddingLeft: '48px' }}>
                        {children.subPartyName}
                      </StyledTableCellData>
                      <StyledTableCellData align='right' sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <IconButton sx={{ padding: 0 }} aria-label='more' size='small' onClick={handlePopoverOpen}>
                          <MoreVertIcon sx={{ height: '15px' }} />
                        </IconButton>
                        ₹ {children.subPartyBalance}
                      </StyledTableCellData>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  );
};

export default SideTable;
