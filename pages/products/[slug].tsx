import { useEffect } from "react";
import MultiplePhotoUploader from "../../components/MultiplePhotoUploader";
import { uploadImageAndUpdateProduct } from "../../lib/features/images/productImageThunk";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectProductById } from "../../lib/features/images/productSelector";
import PhotoThumbNail from "../../components/PhotoThumbnail";

export default function ProductPage({ product }) {

  const images = product.imageUrls 

  return (
    <main>
      <h1>{product?.productName}</h1>
      <div style={{ width: 200 }}>
        <MultiplePhotoUploader />
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
