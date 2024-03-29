import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'features/auth/authSlice';
import darkModeReducer from 'features/darkMode/darkModeSlice';
import goalReducer from 'features/goals/goalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
