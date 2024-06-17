import MultiplePhotoUploader from "../../components/MultiplePhotoUploader";

export default function ProductPage(props) {

  return (
    <div>
      <h1>Product: {props.product.name}</h1>
      <div style={{width: 200, height: 400}}>
      <MultiplePhotoUploader productId={props.product._id}/>
        </div>
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
