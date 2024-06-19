import { createAsyncThunk } from "@reduxjs/toolkit";

interface UploadImagePayload {
  productId: string;
  payload: string[];
}

export const uploadImageAndUpdateProduct = createAsyncThunk(
  "products/uploadImageAndUpdateProduct",
  async ({ productId, payload }: UploadImagePayload, { rejectWithValue }) => {
    const url = `/api/products/update/route?_id=${productId}`;

    try {
      const imageUrls = JSON.stringify({ payload });


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
      console.log(data.message); 
      return data; 
    } catch (error) {
      console.error("Error in thunk:", error);
      return rejectWithValue(error.message); 
    }
  }
);
