/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableRow, Paper, Box, TablePagination, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  StyledBox,
  StyledBoxWithCircle,
  StyledButton,
  StyledPopover,
  StyledTableCell,
  StyledTableCellData,
  StyledTableContainer,
  StyledTableRow,
  StyledTableSortLabel,
  StyledTextField,
  StyledTypography,
} from './style';

const CustomDataTable = ({
  rows = [],
  columns = [],
  sx,
  isActive,
  tableName,
  labels = [],
  onLabelClick,
  moreIconOpen,
  anchorElement,
  closePoper,
}) => {
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const open = Boolean(anchorElement);
  const id = open ? 'simple-popover' : undefined;

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);
    const filteredData = rows.filter((row) =>
      Object.values(row)?.some((value) => value?.toString()?.toLowerCase()?.includes(searchText))
    );
    setFilteredRows(filteredData);
    setPage(0);
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...filteredRows].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredRows(sortedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!rows.length || !columns.length) {
    return (
      <StyledBox sx={{ ...sx }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <StyledTypography>{tableName}</StyledTypography>
          <StyledTextField
            size='small'
            placeholder='search transactions'
            label='Search'
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
            value={filterText}
            onChange={handleFilterChange}
          />
        </Box>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Data Not Available</StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </StyledTableContainer>
      </StyledBox>
    );
  }

  return (
    <StyledBox
      sx={{
        ...sx,
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <StyledTypography>{tableName}</StyledTypography>
        <StyledTextField
          size='small'
          placeholder='search transactions'
          label='Search'
          InputLabelProps={{
            style: { color: '#89939E' },
          }}
          value={filterText}
          onChange={handleFilterChange}
        />
      </Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <StyledTableCell key={idx}>
                  <StyledTableSortLabel
                    active={sortConfig.key === column.accessor}
                    direction={sortConfig.key === column.accessor ? sortConfig.direction : 'asc'}
                    onClick={() => sortData(column.accessor)}>
                    {column.Header}
                  </StyledTableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
              const isEven = rowIndex % 2 === 0;
              return (
                <StyledTableRow key={rowIndex} even={isEven ? 'true' : 'false'}>
                  {columns.map((column, columnIndex) => {
                    const isActions = column.Header === 'actions';
                    const isStatus = column.Header === 'status';
                    return (
                      <StyledTableCellData align='left' key={columnIndex}>
                        {columnIndex === 0 ? (
                          <StyledBoxWithCircle>
                            {isActive && (
                              <Box
                                sx={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '100%' }}
                              />
                            )}
                            <Box>{row[column.accessor]}</Box>
                          </StyledBoxWithCircle>
                        ) : isActions ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {row[column.accessor]}
                            <MoreVertIcon sx={{ fill: '#212121', cursor: 'pointer' }} />
                          </Box>
                        ) : isStatus ? (
                          <StyledBoxWithCircle>
                            <Box sx={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '100%' }} />
                            <Box>{row[column.accessor]}</Box>
                          </StyledBoxWithCircle>
                        ) : (
                          <>{row[column.accessor]}</>
                        )}
                        {columnIndex === columns.length - 1 && (
                          <MoreVertIcon
                            onClick={(e) => moreIconOpen(e, row)}
                            sx={{ fill: '#212121', cursor: 'pointer', position: 'absolute', top: 13, right: 23 }}
                          />
                        )}
                        <Popover
                          elevation={0}
                          id={id}
                          open={open}
                          anchorEl={anchorElement}
                          onClose={closePoper}
                          anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                          }}>
                          <StyledPopover>
                            {labels.map((label) => (
                              <StyledButton
                                onClick={() => {
                                  onLabelClick(label.name);
                                }}
                                key={label.name}>
                                {label.label}
                              </StyledButton>
                            ))}
                          </StyledPopover>
                        </Popover>
                      </StyledTableCellData>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component='div'
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledBox>
  );
};

export default CustomDataTable;
