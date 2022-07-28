import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});

export default store;
