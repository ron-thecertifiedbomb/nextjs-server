import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagesState {
  imageUrls: string[];
}

const initialState: ImagesState = {
  imageUrls: [],
};

const imagesSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    productImages(state, action: PayloadAction<string[]>) {
      state.imageUrls = action.payload;
    },
    uploadImages(state, action: PayloadAction<string | string[]>) {
      // Check if action.payload is an array
      const newImageUrls = Array.isArray(action.payload) ? action.payload : [action.payload];
      
      // Merge new imageUrls with existing ones, ensuring uniqueness
      const uniqueUrls = Array.from(new Set([...state.imageUrls, ...newImageUrls]));
      state.imageUrls = uniqueUrls;
    },
  },
});

export const { productImages, uploadImages } = imagesSlice.actions;

export default imagesSlice.reducer;
