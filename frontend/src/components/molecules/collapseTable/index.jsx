import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import {
  StyledBox,
  StyledTableCell,
  StyledTableCellData,
  StyledTableContainer,
  StyledTableRow,
  StyledTextField,
  StyledTypography,
} from './style';

const RowWithCollapsible = ({ row, column, collapseColumn, collapseRow, rowIndex }) => {
  const [open, setOpen] = React.useState(false);
  const isEven = rowIndex % 2 === 0;

  return (
    <>
      <StyledTableRow even={isEven ? 'true' : 'false'}>
        <StyledTableCellData>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row[column[0].accessor]}
        </StyledTableCellData>
        {column.slice(1).map((columnName) => (
          <StyledTableCellData key={`${columnName.accessor}`}>{row[columnName.accessor]}</StyledTableCellData>
        ))}
        <StyledTableCellData>
          <MoreVertIcon sx={{ fill: '#212121', cursor: 'pointer' }} />
        </StyledTableCellData>
      </StyledTableRow>
      <TableRow>
        <StyledTableCellData style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    {collapseColumn.map((cName) => (
                      <StyledTableCell key={cName.Header}>{cName.Header}</StyledTableCell>
                    ))}
                    <StyledTableCellData />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collapseRow.map((rowData) => (
                    <TableRow key={rowData}>
                      {collapseColumn.map((columnName) => (
                        <StyledTableCellData component='th' scope='row' key={columnName}>
                          {rowData[columnName.accessor]}
                        </StyledTableCellData>
                      ))}
                      <StyledTableCellData sx={{ display: 'flex', justifyContent: 'end' }}>
                        <MoreVertIcon sx={{ fill: '#212121', cursor: 'pointer' }} />
                      </StyledTableCellData>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCellData>
      </TableRow>
    </>
  );
};

export default function CollapsibleTable({ tableName, tableRow, column, collapseColumn }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState(tableRow);
  const [sortBy, setSortBy] = useState({ column: null, direction: 'asc' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);
    const filteredData = tableRow.filter((row) => {
      const mainRowData = Object.values(row)?.some((value) => {
        const strValue = String(value)?.toLowerCase();
        return strValue?.includes(searchText);
      });
      const collapseRowData = row.items?.some((item) =>
        Object.values(item)?.some((value) => {
          const strValue = String(value)?.toLowerCase();
          return strValue?.includes(searchText);
        })
      );
      return mainRowData || collapseRowData;
    });
    setFilteredRows(filteredData);
    setPage(0);
  };

  const handleSort = (columnName) => {
    const isAsc = sortBy.column === columnName && sortBy.direction === 'asc';
    setSortBy({ column: columnName, direction: isAsc ? 'desc' : 'asc' });
  };

  const sortedRows = filteredRows.sort((a, b) => {
    const columnAccessor = sortBy.column?.accessor;

    const isDateColumn = column.find((col) => col.accessor === columnAccessor)?.accessor === 'date';

    if (isDateColumn) {
      const aValue = new Date(a[columnAccessor].split('/').reverse().join('-'));
      const bValue = new Date(b[columnAccessor].split('/').reverse().join('-'));

      if (sortBy.direction === 'asc') {
        return bValue - aValue;
      }
      return aValue - bValue;
    }
    return 0;
  });

  if (!tableRow.length || !column.length) {
    return (
      <StyledBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <StyledTypography>{tableName}</StyledTypography>
          <StyledTextField
            size='small'
            placeholder='Search Transactions'
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
    <>
      <StyledBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <StyledTypography>{tableName}</StyledTypography>
          <StyledTextField
            size='small'
            placeholder='Search Transactions'
            label='Search'
            InputLabelProps={{
              style: { color: '#89939E' },
            }}
            value={filterText}
            onChange={handleFilterChange}
          />
        </Box>
        <StyledTableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                {column.map((cName) => (
                  <StyledTableCell key={cName.id} onClick={() => handleSort(cName)}>
                    {cName.Header}
                    <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      {cName.Header === 'Date' && sortBy.column === cName && (
                        <>
                          {sortBy.direction === 'asc' ? (
                            <ArrowUpwardIcon fontSize='small' />
                          ) : (
                            <ArrowDownwardIcon fontSize='small' />
                          )}
                        </>
                      )}
                    </span>
                  </StyledTableCell>
                ))}
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                <RowWithCollapsible
                  column={column}
                  row={row}
                  collapseRow={row.items}
                  rowIndex={rowIndex}
                  collapseColumn={collapseColumn}
                />
              ))}
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
    </>
  );
}
