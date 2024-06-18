import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagesState {
  images: string[];
}

const initialState: ImagesState = {
  images: [],
};

const imagesSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    productImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
    },
    uploadImages(state, action: PayloadAction<string[]>) {
      state.images = [...state.images, ...action.payload];
    },
  },
});

export const { productImages, uploadImages } = imagesSlice.actions;

export default imagesSlice.reducer;
