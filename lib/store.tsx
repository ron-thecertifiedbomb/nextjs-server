import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';


export const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
export type AppStore = ReturnType<typeof store>


