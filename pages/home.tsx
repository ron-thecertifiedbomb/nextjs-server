import React from "react";

import styles from "../styles/page.module.css";
import { useDispatch } from "react-redux";
import { clearImages } from "../lib/features/images/productImagesSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleClearImages = () => {
    dispatch(clearImages());
  };

  return (
    <>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1>Welcome to Lizard Interactive Server</h1>
            {/* <button onClick={handleClearImages}>Clear Images</button> */}
      
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

