import { useEffect } from "react";
import MultiplePhotoUploader from "../../components/MultiplePhotoUploader";
import { uploadImageAndUpdateProduct } from "../../lib/features/images/productImageThunk";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectProductById } from "../../lib/features/images/productSelector";



export default function ProductPage({ product }) {

  const dispatch = useAppDispatch();

  const images = useAppSelector((state) => state.storage.images);

  const productId = product._id;

  const selectedProduct = useAppSelector(selectProductById(product._id)); 



  const handleUpload = () => {
    dispatch(uploadImageAndUpdateProduct({ productId: productId, images }));
  };

  

  return (
    <div>
      <h1>Product: {selectedProduct?.productName}</h1>
      <div style={{ width: 200, height: 400 }}>
        <MultiplePhotoUploader productId={productId}/>
      </div>
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const response = await fetch(
    `https://nextjs-server-rho.vercel.app/api/products/getProduct/route?_id=${slug}`
  );
  const product = await response.json();

  return {
    props: { product },
  };
}
