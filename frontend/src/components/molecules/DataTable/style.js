import {
  Box,
  TableCell,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  styled,
  TableContainer,
  Button,
} from '@mui/material';
export const StyledBox = styled(Box)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.08);
`;

export const StyledTypography = styled(Typography)`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5rem;
  font-family: Inter;
  color: #212121;
`;

export const StyledTextField = styled(TextField)`
  max-height: 40px;
  max-width: 350px;
  padding: 0;
  border-radius: 0.5rem;
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: 1px solid #89939e;
  }
`;

export const StyledTableCell = styled(TableCell)`
  border: none;
`;

export const StyledTableSortLabel = styled(TableSortLabel)`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5rem;
  font-family: Inter;
  color: #212121;
  padding-left: 13px;
`;

export const StyledTableCellData = styled(TableCell)`
  padding-left: 29px;
  padding-right: 35px;
  font-size: 14px;
  font-weight: 400;
  padding-top: 13px;
  padding-bottom: 13px;
  line-height: 20px;
  position: relative;
  font-family: Inter;
`;

export const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.even === 'true' ? '#FFFFFF' : '#EDEDED')};
`;

export const StyledBoxWithCircle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 21px;
`;

export const StyledTableContainer = styled(TableContainer)`
  box-shadow: 'none';
  border-radius: 0;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: 'white';
  }
  &::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 5px;
    height: 5px;
  }
`;

export const StyledPopover = styled(Box)`
  display: grid;
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledButton = styled(Button)`
  padding: 0;
  color: #4d4d4d;
  text-transform: capitalize;
  font-size: 14px;
  line-height: 16.94px;
  font-family: Inter;
`;

export const StyledTextarea = styled(TextField)`
  width: 350px;
  height: 130px;
  border: none;
  border-radius: 0.5rem;
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: 1px solid #89939e;
  }
`;
