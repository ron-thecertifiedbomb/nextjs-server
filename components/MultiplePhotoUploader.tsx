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
    if (total < 4) { // Change the limit to 4
      setTotal(total + 1);
      setUploaders([...uploaders, total]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {uploaders.map((uploader, index) => (
        <div key={index} style={{ display: "flex", gap: 10 }}>
          <PhotoUploader key={uploader} />
          {index > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUploaders(uploaders.filter((_, idx) => idx !== index));
                setTotal(total - 1);
              }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      {total < 4 && (
        <Button variant="contained" color="primary" onClick={addUploader}>
          Add Images
        </Button>
      )}
      {total >= 4 && ( // Change the limit to 4
        <p style={{ color: "red" }}>
          Maximum upload limit reached ({totalNoOfImages} images)
        </p>
      )}
    </div>
  );
};

export default MultiplePhotoUploader;
