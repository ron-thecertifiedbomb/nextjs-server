import { createAsyncThunk } from "@reduxjs/toolkit";

interface UploadImagePayload {
  productId: string;
  images: string[];
}

export const uploadImageAndUpdateProduct = createAsyncThunk(
  "products/uploadImageAndUpdateProduct",
  async ({ productId, images }: UploadImagePayload, { rejectWithValue, dispatch }) => {
    const url = `https://nextjs-server-rho.vercel.app/api/products/updateProduct/route?_id=${productId}`;

    try {
      const imageUrls = JSON.stringify({ images });
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: imageUrls,
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();

      // Dispatch an action to clear images array after successful upload
      dispatch(clearImages());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action creator to clear images array
export const clearImages = () => ({
  type: "products/clearImages",
});
