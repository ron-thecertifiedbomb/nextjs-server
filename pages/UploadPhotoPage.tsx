import React, { useCallback } from "react";
import MultiplePhotoUploader from "../components/MultiplePhotoUploader";


const UploadPhotoPage = () => {
  
  const productId = "6650011ab3f82d2c9af555f5";

  const url = `/api/products/updateProduct/route?_id=${productId}`;

  const handleSubmit = useCallback(async (images) => {

    console.log("data from the component", JSON.stringify(images));

    try {
      const updatedData = JSON.stringify(images);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), 
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const data = await response.json();
      console.log("User added successfully:", data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 500,
          padding: 20,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Product Image Uploader</h2>
        <MultiplePhotoUploader  />
      </div>
    </div>
  );
};

export default UploadPhotoPage;
