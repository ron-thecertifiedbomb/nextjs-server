import { useDispatch } from 'react-redux';
import MultiplePhotoUploader from "../../components/MultiplePhotoUploader";
import PhotoThumbNail from "../../components/PhotoThumbnail";
import { uploadImageAndUpdateProduct } from '../../lib/features/images/productImageThunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';


export default function ProductPage({ product }) {
  const images = product.imageUrls;
  const totalNoOfImages: number = images.length;
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch(); // Initialize dispatch function with ThunkDispatch


  const handleUpload = () => {
    // Dispatch thunk action when the button is clicked
    dispatch(uploadImageAndUpdateProduct({ productId: product.id, images: images }));
  };

  return (
    <main>
      <h1>{product?.productName}</h1>
      <div style={{ width: 200 }}>
        <MultiplePhotoUploader totalNoOfImages={totalNoOfImages} />
        <button onClick={handleUpload}>Upload Images</button> {/* Button to trigger thunk */}
      </div>
      <PhotoThumbNail imageUrls={images} />
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const response = await fetch(
    `https://nextjs-server-rho.vercel.app/api/products/getProduct/route?productName=${encodeURIComponent(slug)}`
  );
  const product = await response.json();

  return {
    props: { product },
  };
}
