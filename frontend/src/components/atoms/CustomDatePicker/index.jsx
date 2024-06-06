import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Box, TextField } from '@mui/material';

const CustomDatePicker = ({ label, onChange, onBlur, minDate, value, error, helperText }) => {
  const handleDateChange = (date) => {
    if (date && date.isValid()) {
      console.log(dayjs(value));
      onChange(date);
    } else {
      onChange(null);
    }
  };

  return (
    <>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DatePicker']}
            sx={{
              width: '100%',
              paddingTop: 0,
              overflow: 'visible',
            }}>
            <DatePicker
              sx={{
                width: '100%',
                paddingTop: 0,
              }}
              format='DD-MM-YYYY'
              label={label}
              value={value ? dayjs(value) : null}
              minDate={minDate ? dayjs(minDate) : null}
              onChange={handleDateChange}
              onBlur={onBlur}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line
                  {...params}
                  error
                  helperText='Please select a date'
                  fullWidth
                />
              )}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      {error && <Box sx={{ color: '#FF2626' }}>{helperText}</Box>}
    </>
  );
};

export default CustomDatePicker;
