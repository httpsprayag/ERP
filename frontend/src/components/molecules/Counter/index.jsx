import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import { decrement, increment } from '../../../redux/features/counter/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 4 }}>
      <Button variant='contained' aria-label='Increment value' type='button' onClick={() => dispatch(increment())}>
        Increment
      </Button>
      <span>{count}</span>
      <Button variant='contained' aria-label='Decrement value' type='button' onClick={() => dispatch(decrement())}>
        Decrement
      </Button>
    </Box>
  );
};

export default Counter;
