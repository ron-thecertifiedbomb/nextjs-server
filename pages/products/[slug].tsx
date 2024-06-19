import { useDispatch, useSelector } from "react-redux";
import MultiplePhotoUploader from "../../components/MultiplePhotoUploader";
import PhotoThumbNail from "../../components/PhotoThumbnail";
import { uploadImageAndUpdateProduct } from "../../lib/features/images/productImageThunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../lib/store";
import {  selectImages } from "../../lib/features/images/productImagesSlice";
import { useEffect } from "react";
import { getProduct, productImages } from "../../lib/features/images/getAllProductSlice";
import { productDetails } from "../../lib/features/images/productSelector";


export default function ProductPage({ product }) {

  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();


  const productId = product._id;

  const imagesData = useSelector(productImages); 
  const totalNoOfImages: number = imagesData.length;
  
  console.log('Total Images from Store', totalNoOfImages)

  const handleUpload = () => {
    dispatch(
      uploadImageAndUpdateProduct({ productId: productId, payload: imagesData })
    );
  };
  useEffect(() => {
    dispatch(getProduct(product));
  }, [dispatch, product]);

 

  return (
    <main>
      <h1>{product?.productName}</h1>
      <div style={{ width: 200 }}>
        <MultiplePhotoUploader totalNoOfImages={totalNoOfImages} />
        {totalNoOfImages < 4 && (
          <button onClick={handleUpload}>Upload Images</button>
        )}
      </div>
      <PhotoThumbNail imageUrls={imagesData} />
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const response = await fetch(
    `https://nextjs-server-rho.vercel.app/api/products/getProduct/route?productName=${encodeURIComponent(
      slug
    )}`
  );
  const product = await response.json();

  return {
    props: { product },
  };
}
