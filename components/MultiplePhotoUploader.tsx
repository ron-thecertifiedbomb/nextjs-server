import React, { useState } from "react";
import { Button } from "@mui/material";
import PhotoUploader from "./PhotoUploader";

interface MultiplePhotoUploaderProps {
  totalNoOfImages: number;
}

const MultiplePhotoUploader: React.FC<MultiplePhotoUploaderProps> = ({
  totalNoOfImages,
}) => {
  const [total, setTotal] = useState<number>(totalNoOfImages);
  const [uploaders, setUploaders] = useState<number[]>([0]);

  const addUploader = () => {
    if (total < 4) {
      setTotal(total + 1);
      setUploaders([...uploaders, total]);
    }
  };

  const removeUploader = (index: number) => {
    if (total > totalNoOfImages) {
      setUploaders(uploaders.filter((_, idx) => idx !== index));
      setTotal(total - 1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {uploaders.map((uploader, index) => (
        <div key={index} style={{ display: total >= 4 ? "none" : "flex", gap: 10 }}>
          <PhotoUploader key={uploader} />
          {index > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => removeUploader(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      {total < 4 && (
        <Button variant="contained" color="primary" onClick={addUploader} style={{ display: total >= 4 ? "none" : '' }}>
          Add Images
        </Button>
      )}
      {uploaders.length >= 4 && (
        <p style={{ color: "red" }}>
          Maximum upload limit is 4 images 
        </p>
      )}
    </div>
  );
};

export default MultiplePhotoUploader;
