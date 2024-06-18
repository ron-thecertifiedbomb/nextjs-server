import { Product } from "../../../types/types";
import { RootState } from "../../store";
interface ImagesState {
  images: string[];
}


export const selectAllProducts = (state: RootState) => state.products.products;


export const selectProductById = (productId: string) =>
    (state: RootState): Product | undefined => {
      return state.products.products.find((product) => product._id === productId);
    };

    

    export const selectProductImagesById = (productId: string) => (state: RootState): string[] | undefined => {
      const product = state.products.products.find((product) => product._id === productId);
      return product?.imageUrls;
    };


    export const selectProductImages = (state: { storage: ImagesState }) => state.storage.images;