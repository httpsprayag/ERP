import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { PURGE } from 'redux-persist';
import { userLogin } from '../../../api/login';
import { API_STATUS } from '../../../utils';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  isLoading: false,
  error: null,
  loginApiStatus: API_STATUS.idle,
  user: {},
  accessibleMenus: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.clear();
      storage.removeItem('persist:root');
    },
    setToken: (state, { payload }) => ({ ...state, accessToken: payload }),
    getToken: (state) => state.accessToken,
    resetUser: (state) => ({ ...state, loginApiStatus: API_STATUS.idle }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLogin.pending, (state) => ({ ...state, isLoading: true, loginApiStatus: API_STATUS.pending }))
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        localStorage.setItem('access_token', payload?.result?.accessToken);
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          accessToken: payload.token,
          loginApiStatus: API_STATUS.success,
          user: payload,
          accessibleMenus: payload.result.accessibleMenus,
        };
      })
      .addCase(userLogin.rejected, (state, { payload }) => ({
        ...state,
        error: payload.message,
        loginApiStatus: API_STATUS.fail,
      }))
      .addCase(PURGE, () => initialState),
});

export const { logoutUser, setToken, getToken, resetUser } = authSlice.actions;
export const isAuthenticated = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
