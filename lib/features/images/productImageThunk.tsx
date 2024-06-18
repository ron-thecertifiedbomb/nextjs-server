import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearImages } from "./productImagesSlice";


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
      dispatch(clearImages()); 
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

