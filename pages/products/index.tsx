import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Product } from "./types";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{ products: Product[] }> = async () => {
  
  const res = await fetch(
    "https://nextjs-server-rho.vercel.app/api/products/getAllProducts/route"
  );
  const products: Product[] = await res.json();
  return { props: { products } };
};

export default function ProductPage({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <main>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>{product.name}</p>
            <button onClick={() => handleProductClick(product._id)}>View Product</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
