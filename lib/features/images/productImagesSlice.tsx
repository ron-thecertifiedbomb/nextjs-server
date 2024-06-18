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
    uploadImages(state, action: PayloadAction<string[]>) {
      // Merge new imageUrls with existing ones, ensuring uniqueness
      const uniqueUrls = Array.from(new Set([...state.imageUrls, ...action.payload]));
      state.imageUrls = uniqueUrls;
    },
  },
});

export const { productImages, uploadImages } = imagesSlice.actions;

export default imagesSlice.reducer;
