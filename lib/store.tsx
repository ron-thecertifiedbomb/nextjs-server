import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
