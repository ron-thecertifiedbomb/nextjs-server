import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CounterState {
  count: number;
}


const initialState: CounterState = {
  count: 0,
};


const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    initializeCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },

  },
});

// Export actions
export const { initializeCount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
