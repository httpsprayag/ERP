import { Box, TableCell, TableContainer, TableRow, TableSortLabel, TextField, Typography, styled } from '@mui/material';

export const StyledBox = styled(Box)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.1)',
}));

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '1.5rem',
  fontFamily: 'Inter',
  color: '#212121',
}));

export const StyledTextField = styled(TextField)(() => ({
  maxHeight: '40px',
  maxWidth: '350px',
  padding: '0',
  borderRadius: '0.5rem',
  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
    border: '1px solid #89939e',
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 600,
}));

export const StyledTableCellData = styled(TableCell)(() => ({
  paddingLeft: '29px',
  paddingRight: '35px',
  fontSize: '14px',
  fontWeight: 400,
  paddingTop: '13px',
  paddingBottom: '13px',
  lineHeight: '20px',
  position: 'relative',
  fontFamily: 'Inter',
}));

export const StyledTableRow = styled(TableRow)(({ even }) => ({
  backgroundColor: even === 'true' ? '#FFFFFF' : '#EDEDED',
}));

export const StyledTableContainer = styled(TableContainer)(() => ({
  boxShadow: 'none',
  borderRadius: 0,
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'red',
    borderRadius: '5px',
    height: '5px',
  },
}));

export const StyledTableSortLabel = styled(TableSortLabel)`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5rem;
  font-family: Inter;
  color: #212121;
  padding-left: 13px;
`;
