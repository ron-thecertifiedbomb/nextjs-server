
export default function Page(props) {

  return (
    <div>
      <h1>Product: {props.product.name}</h1>
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
