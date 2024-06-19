import { ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { clearImages } from "./productImagesSlice";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";

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
      console.log("Message from backend:", data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
