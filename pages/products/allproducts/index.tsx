import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Product } from "../types";

export const getServerSideProps = (async () => {
  const res = await fetch(
    "https://nextjs-server-rho.vercel.app/api/products/getAllProducts/route"
  );
  const products: Product = await res.json();
  return { props: { products } };
}) satisfies GetServerSideProps<{ products: Product }>;

export default function ProductPage({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(products);
  return (
    <main>
      <h1>All Products</h1>
    </main>
  );
}
