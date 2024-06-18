
import React, { useState } from "react";
import Image from "next/image";
import styles from '../styles/PhotoThumbnail.module.css';
import { Product } from "../types/types";

interface PhotoThumbNailProps {
    imageUrls: string[]; 
}

const PhotoThumbNail: React.FC<PhotoThumbNailProps> = ({ imageUrls }) => {

  const [mainImage, setMainImage] = useState(imageUrls[0]); 

  if (!imageUrls || imageUrls.length === 0) {
    return <div>No images available</div>;
  }

  
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  // Slice the array to get the last four images
  const lastFourImages = imageUrls.slice(-4);

  return (
    <main className={styles.thumbnailContainer}>
      <div className={styles.thumbnail} onClick={() => handleThumbnailClick(mainImage)}>
        {/* Displaying the main image */}
        <Image src={mainImage} alt="main_image" width={150} height={150} priority={false} />
      </div>
      <div className={styles.boxesWrapper}>
        {lastFourImages.map((image, index) => (
          <div key={index} className={styles.smallBox} onClick={() => handleThumbnailClick(image)}>
            <Image src={image} alt={`image_link_${index}`} width={80} height={80} priority={false} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default PhotoThumbNail;
