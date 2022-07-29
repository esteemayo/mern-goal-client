import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import { register } from 'services/userService';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...userData });
      toast.success('Registered Successfully');
      return data;
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
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJwt();
const tokenKey = 'accessToken';
const user = JSON.parse(localStorage.getItem(tokenKey));

const initialState = {
  user: user ? user : null,
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
      state.message = false;
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
      localStorage.setItem(tokenKey, JSON.stringify(payload));
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
  },
});

export const { reset, setLogout } = authSlice.actions;

export default authSlice.reducer;