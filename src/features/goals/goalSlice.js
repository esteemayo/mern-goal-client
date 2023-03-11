import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as goalAPI from 'services/goalService';

export const fetchGoals = createAsyncThunk(
  'goals/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await goalAPI.getGoals();
      return data.goals;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNewGoal = createAsyncThunk(
  'goals/create',
  async ({ goal, toast }, { rejectWithValue }) => {
    try {
      const { data } = await goalAPI.createGoal({ text: goal });
      toast.success('Goal Created Successfully');
      return data.goal;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editGoal = createAsyncThunk(
  'goals/update',
  async ({ goalId, goal, toast }, { rejectWithValue }) => {
    try {
      const { data } = await goalAPI.updateGoal(goalId, goal);
      toast.success('Goal Updated Successfully');
      return data.goal;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeGoal = createAsyncThunk(
  'goals/delete',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      await goalAPI.deleteGoal(id);
      toast.success('Goal Deleted Successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [fetchGoals.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGoals.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = payload;
    },
    [fetchGoals.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload.message;
    },
    [createNewGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [createNewGoal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.unshift(payload);
    },
    [createNewGoal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload.message;
    },
    [removeGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [removeGoal.fulfilled]: (state, { meta, payload }) => {
      state.isLoading = false;
      state.isSuccess = true;

      const {
        arg: { id },
      } = meta;

      if (id) {
        state.goals.splice(
          state.goals.findIndex((item) => item._id === id),
          1
        );
      }
    },
    [removeGoal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload.message;
    },
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
