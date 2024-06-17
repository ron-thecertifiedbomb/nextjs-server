import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from "./features/counter/counterSlice";
import imageReducer from './features/images/productImagesSlice'

const rootReducer = combineReducers({

    counter: counterReducer,
      storage: imageReducer
  
  
  });

  export default rootReducer;