import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {

    response.status(200).end();
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("products");
    const productId = request.query._id as string;
    const { images, otherProperties } = request.body;

 

    const updateNestedProperties = (target, source) => {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          updateNestedProperties(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    };

    const existingProduct = await collection.findOne({
      _id: new ObjectId(productId),
    });

    if (!existingProduct) {
      response.status(404).json({ message: "Product not found" });
      return;
    }

    if (images) {
      existingProduct.imageUrls = images;
    }

    if (otherProperties) {
      updateNestedProperties(existingProduct, otherProperties);
    }


    const result = await collection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: existingProduct }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Failed to update product");
    }


    response.status(200).json({
      message: "Product updated successfully",
      updatedProduct: existingProduct,
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
