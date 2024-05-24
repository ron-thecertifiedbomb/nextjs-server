import React, { useCallback } from "react";

import UploadPhotoForm from "../components/UploadPhoto";

const UploadPhotoPage = () => {

     const productId = '6650011ab3f82d2c9af555f3'

    // const url = '/api/products/updateProduct/route'

   const url = `/api/products/updateProduct/route?_id=${productId}`

// const url = '/api/products/updateProduct/route?_id=6650011ab3f82d2c9af555f3'

    // http://localhost:3001/api/products/updateProduct/route?_id=6650011ab3f82d2c9af555f3
  const handleSubmit = useCallback(async (userData) => {

    console.log('url', url)
    console.log('userdata', userData)
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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
        <h1>Upload Image</h1>
        <UploadPhotoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default UploadPhotoPage;
