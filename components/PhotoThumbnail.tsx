
import React, { useState } from "react";
import Image from "next/image";
import styles from '../styles/PhotoThumbnail.module.css';


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


  return (
    <main className={styles.thumbnailContainer}>
      <div className={styles.thumbnail} onClick={() => handleThumbnailClick(mainImage)}>
   
        <Image src={mainImage} alt="main_image" width={150} height={150} priority={false} />
      </div>
      <div className={styles.boxesWrapper}>
        {imageUrls.map((image, index) => (
          <div key={index} className={styles.smallBox} onClick={() => handleThumbnailClick(image)}>
            <Image src={image} alt={`image_link_${index}`} width={80} height={80} priority={false} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default PhotoThumbNail;
