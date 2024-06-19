import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadImageAndUpdateProduct } from './productImageThunk';

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
    clearImages(state) {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImageAndUpdateProduct.fulfilled, (state) => {
      state.images = [];
    });
  },
});

export const { productImages, uploadImages, clearImages } = imagesSlice.actions;
export const selectImages = (state: { storage: ImagesState }) => state.storage.images;
export default imagesSlice.reducer;
