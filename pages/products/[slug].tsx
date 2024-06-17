
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import MultiplePhotoUploader from "../../components/MultiplePhotoUploader";
import { uploadImageAndUpdateProduct } from "../../lib/features/images/productImageThunk";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";

export default function ProductPage(props) {

  const images = useAppSelector((state) => state.storage.images)
  const productId = props.product._id;

  const dispatch = useAppDispatch()
  
  const handleUpload = () => {
    dispatch(uploadImageAndUpdateProduct({ productId: productId, images }));
  };


  return (
    <div>
      <h1>Product: {props.product.name}</h1>
      <div style={{width: 200, height: 400}}>
      <MultiplePhotoUploader/>
        </div>
        <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
}

export async function getServerSideProps({ params }) {

  const { slug } = params;
  const response = await fetch(
    `https://nextjs-server-rho.vercel.app/api/products/getProduct/route?=_id=${slug}`
  );
  const product = await response.json();

  return {
    props: { product },
  };
}


