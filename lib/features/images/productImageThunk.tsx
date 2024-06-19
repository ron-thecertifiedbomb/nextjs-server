import { createAsyncThunk } from "@reduxjs/toolkit";

interface UploadImagePayload {
  productId: string;
  payload: string[];
}

export const uploadImageAndUpdateProduct = createAsyncThunk(
  "products/uploadImageAndUpdateProduct",
  async ({ productId, payload }: UploadImagePayload, { rejectWithValue }) => {
    const url = `/api/products/update/route`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, payload }), // Send both productId and payload
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      console.log("Message from backend:", data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
