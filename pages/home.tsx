import React, { useEffect } from "react";
import styles from "../styles/page.module.css";
import { useDispatch } from "react-redux";
import { clearImages } from "../lib/features/images/productImagesSlice";
import useFetchData from "../utilities/useFetchData";


const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleClearImages = () => {
    dispatch(clearImages());
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1>{error}</h1>

            <button onClick={handleClearImages}>Clear Images</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
