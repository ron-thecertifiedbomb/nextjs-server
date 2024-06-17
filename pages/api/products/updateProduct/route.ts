import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

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
    const { images } = JSON.parse(request.body);

    const existingProduct = await collection.findOne({
      _id: new ObjectId(productId),
    });

    if (!existingProduct) {
      response.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedImages = existingProduct.images
      ? [...existingProduct.images, ...images]
      : images;

    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: { images: updatedImages } },
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
