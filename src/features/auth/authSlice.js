import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import { register } from 'services/userService';
import { getFromStorage, setToStorage, tokenKey } from 'utils';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...userData });
      toast.success('Registered Successfully');
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...userData });
      toast.success('Login Successfully');
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, toast }, { rejectWithValue }) => {
    try {
      await authAPI.forgot({ email });
      toast.success('Token Successfully Sent to Email');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, credentials, toast }, { rejectWithValue }) => {
    try {
      await authAPI.reset(token, credentials);
      toast.success('Password Successfully Changed');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJwt();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (new Date().getTime() > expiredToken) {
    localStorage.removeItem(tokenKey);
    initialState.user = null;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setLogout: (state) => {
      localStorage.removeItem(tokenKey);
      state.user = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload.message;
      state.user = null;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem(tokenKey, JSON.stringify(payload));
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload.message;
      state.user = null;
    },
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload.message;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload.message;
    },
  },
});

export const { reset, setLogout } = authSlice.actions;

export default authSlice.reducer;
