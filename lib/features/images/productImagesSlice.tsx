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
    totalImages(state) {
      state.images
    },
    productImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
    },
    uploadImages(state, action: PayloadAction<string[]>) {
      state.images = [...state.images, ...action.payload];
    },
    clearImages(state) {
      state.images = [];
    },
  },
});

export const { productImages, uploadImages, clearImages, totalImages } = imagesSlice.actions;

export default imagesSlice.reducer;


export const selectImages = (state: { storage: ImagesState }) => state.storage.images;