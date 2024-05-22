import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

const mockProduct = {
  name: 'Xbox 360',
  brand: 'Microsoft',
  price: 499,
  quantity: 10,
  category: 'gaming console',
  specifications: {
    processor: 'Ronan',
    graphics: 'Ronan',
    storage: '1TB NVMe SSD',
    resolution: '4K',
    maxFrameRate: '120fps',
  },
  includedItems: ['Ronan', 'HDMI cable', 'Power cord', 'User manual'],
  availableColors: ['Black'],
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
    const productId = request.query._id as string;

    const existingProduct = await collection.findOne({ _id: new ObjectId(productId) });

  
    if (!existingProduct) {
      response.status(404).json({ message: "Product not found" });
      return;
    }

   
    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: mockProduct },
      { returnDocument: "after" }
    );

  
    response.status(200).json({
      message: "Product updated successfully",
      updatedProduct: updatedProduct.value,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    response.status(500).json({ message: "Error updating product", error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
