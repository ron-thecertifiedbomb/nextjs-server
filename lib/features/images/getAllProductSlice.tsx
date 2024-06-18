import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/types';

interface ProductsState {
  products: Product[];
  product: Product | null;
}

const initialState: ProductsState = {
  products: [],
  product: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    allProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    singleProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
  },
});

export const { allProducts, singleProduct } = productSlice.actions;

export default productSlice.reducer;
