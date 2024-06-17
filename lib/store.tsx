import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import imageReducer from './features/images/productImagesSlice'



export const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      images: imageReducer
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof store>["getState"]>;
export type AppDispatch = ReturnType<typeof store>["dispatch"];
export type AppStore = ReturnType<typeof store>;
