import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { POST } from '../utils/api';

export const userLogin = createAsyncThunk('userLogin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await POST({
      endpoint: `api/v1/users/login`,
      data: { email, password },
    });
    if (!response.success) {
      throw new Error(response.message);
    } else {
      return response;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
});
