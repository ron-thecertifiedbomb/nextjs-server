import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from "./features/counter/counterSlice";
import imageReducer from './features/images/productImagesSlice'
import productReducer from './features/images/getAllProductSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  storage: imageReducer,
  products: productReducer,
});

export default rootReducer;
