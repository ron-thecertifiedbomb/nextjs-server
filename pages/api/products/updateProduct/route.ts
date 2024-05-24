import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

const data = {
  imagelink_portrait:
    "https://firebasestorage.googleapis.com/v0/b/e-commerce-photo-storage.appspot.com/o/files%2Fps5_2.avif?alt=media&token=1287ba0f-62f9-481f-97fe-3bb44815522d",
  imagelink_square:
    "https://firebasestorage.googleapis.com/v0/b/e-commerce-photo-storage.appspot.com/o/files%2Fps5_1.jpg?alt=media&token=6d95711e-201c-470a-bb74-d90e7172a49a",
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("products");
    const productId = "6650011ab3f82d2c9af555f3";
    
    const existingProduct = await collection.findOne({
      _id: new ObjectId(productId),
    });

    if (!existingProduct) {
      response.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: data }, // Use a single object instead of an array
      { returnDocument: "after" }
    );

    response.status(200).json({
      message: "Product updated successfully",
      updatedProduct: updatedProduct.value,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    response
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
