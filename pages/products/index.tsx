import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Product } from "../../types/types";
import { allProducts } from "../../lib/features/images/getAllProductSlice";


export const getServerSideProps = async () => {
  
  const res = await fetch(
    "https://nextjs-server-rho.vercel.app/api/products/getAllProducts/route"
  );
  const products: Product[] = await res.json();
  return { props: { products } };
};

interface ProductPageProps {
  products: Product[];
}

const ProductPage = ({ products }: ProductPageProps) => {
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
   
    dispatch(allProducts(products));
  }, [dispatch, products]);

  const handleProductClick = (productName: string) => {
    router.push(`/products/${encodeURIComponent(productName)}`); 
  };

  return (
    <main>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>{product.productName}</p>
            <button onClick={() => handleProductClick(product.productName)}>
              View Product
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ProductPage;
