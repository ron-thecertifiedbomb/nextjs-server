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
      
      state.imageUrls = [...state.imageUrls, ...action.payload];
    },
  },
});

export const { productImages, uploadImages } = imagesSlice.actions;

export default imagesSlice.reducer;
