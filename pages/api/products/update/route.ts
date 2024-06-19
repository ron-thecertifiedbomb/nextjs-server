import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";


interface Product {
  _id: ObjectId;
  productName: string;

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  let client;
  let productId: string; 

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    
 
    const collection = db.collection("products");

    productId = req.query._id as string; 
    const { payload } = req.body;

    if (!ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

  
    if (!Array.isArray(payload) || payload.some(url => typeof url !== 'string')) {
      res.status(400).json({ message: "Invalid payload format" });
      return;
    }

    
    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $push: { imageUrls: { $each: payload } } },
      { returnDocument: 'after' } 
    );

    const updatedProductData = updatedProduct.value;

    if (!updatedProductData) {
      throw new Error(`Failed to update product with ID ${productId}`);
    }

    res.status(200).json({
      message: "Image URLs added successfully",
      imageUrls: updatedProductData.imageUrls,
      product: updatedProductData,
    });
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    res.status(500).json({ message: "Error updating image URLs", error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
