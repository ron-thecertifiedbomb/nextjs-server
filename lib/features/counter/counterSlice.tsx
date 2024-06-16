import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface CounterState {
  count: number;
}

// Initial state
const initialState: CounterState = {
  count: 0,
};

// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Action to initialize count with a specific value
    initializeCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    // Other actions can go here
  },
});

// Export actions
export const { initializeCount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
