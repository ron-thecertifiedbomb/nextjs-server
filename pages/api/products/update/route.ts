// pages/api/getImageUrls.js

import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  let client;

  try {

    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("products");
    const productId = req.query._id as string;
    const { payload } = req.body;

    if (!ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await collection.findOne({ _id: new ObjectId(productId) });

 
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }


    console.log("Image URLs from the Redux Thunk Payload:", payload);
    console.log("Product:", product);
    console.log("Product ID:", productId);

   
    res.status(200).json({
      message: "Product transmitted successfully",
      imageUrls: product.imageUrls,
      product: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
