import { Box, TableCell, TableSortLabel, TextField, styled } from '@mui/material';

export const StyledTableCell = styled(TableCell)(() => ({
  border: 'none',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '16.94px',
  padding: '13px 0 15px 16px',
}));

export const StyledTableSortLabel = styled(TableSortLabel)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '1.5rem',
  fontFamily: 'Inter',
  color: '#212121',
  paddingLeft: '13px',
}));

export const StyledTableCellData = styled(TableCell)(() => ({
  fontSize: '14px',
  fontWeight: 400,
  paddingTop: '13px',
  paddingBottom: '13px',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  lineHeight: '20px',
  fontFamily: 'Inter',
  borderBottom: '0',
  textAlign: 'left',
}));

export const StyledBox = styled(Box)(() => ({
  maxWidth: '400px',
  maxHeight: '710px',
  padding: '10px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'white',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'red',
    borderRadius: '5px',
    height: '5px',
  },
}));

export const CustomTextField = styled(TextField)({
  padding: '0px',
  fontSize: '14px',
  '& .css-nz481w-MuiInputBase-input-MuiInput-input': {
    padding: '0px',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '&:focus': {
    borderBottom: 'none',
  },
});
