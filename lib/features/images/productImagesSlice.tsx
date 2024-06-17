import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImagesState {
  images: string[];
}

const initialState: ImagesState = {
  images: [],
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    productImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
    },
    uploadImages(state, action: PayloadAction<string[]>) {
      const imageUrls = action.payload;
      state.images = [...state.images, ...imageUrls];
    },
  },
});

export const { productImages, uploadImages } = imagesSlice.actions;

export default imagesSlice.reducer;
