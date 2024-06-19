import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/types';

interface ProductsState {
  products: Product[];
  product: Product | null;
  imageUrls: string[];
}

const initialState: ProductsState = {
  products: [],
  product: null,
  imageUrls: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getAllProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    getProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
  },
});

export const { getAllProducts, getProduct } = productSlice.actions;

export default productSlice.reducer;


export const productImages = (state: { products: ProductsState }) => state.products.product?.imageUrls || [];