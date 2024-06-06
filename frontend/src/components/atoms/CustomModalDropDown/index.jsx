import React from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';

export const CustomModalDropdown = ({
  id,
  name,
  label,
  options,
  onChange,
  onBlur,
  value,
  error,
  helperText,
  height,
  handleAddData,
}) => (
  <Autocomplete
    sx={{
      ...(height
        ? {
            maxHeight: height,
            width: '100%',
            padding: '0',
          }
        : {
            maxHeight: '40px',
            width: '100%',
            padding: '0',
            '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
              transform: 'translate(14px, 10px) scale(1)',
            },
            '& .MuiInputBase-input': {
              padding: '0 !important',
            },
          }),
    }}
    disablePortal
    id={id}
    options={options}
    value={options.find((option) => option?.id === value) ?? null}
    onChange={onChange}
    onBlur={onBlur}
    getOptionLabel={(option) => option?.name || ''}
    getOptionKey={(option) => option?.id || ''}
    noOptionsText={
      <Button onClick={handleAddData} sx={{ color: '#FF2626' }}>
        + Add Group Sale
      </Button>
    }
    renderInput={(params) => (
      <TextField
        // eslint-disable-next-line
        {...params}
        id={name}
        label={label}
        name={name}
        error={error}
        helperText={helperText}
        value={value}
      />
    )}
  />
);
