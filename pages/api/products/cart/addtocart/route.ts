import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();

    const db = client.db("storage");

    const requestBody = JSON.parse(request.body);
    console.log("Request Body:", requestBody);

    const { data } = requestBody;

    const ownerId = data.ownerId;
    console.log("Owner ID:", ownerId);

    const collection = db.collection("cart");

    const owner = await collection.findOne({ ownerId: ownerId });

    if (owner) {
      await collection.updateOne(
        { ownerId: ownerId },
        {
          $push: {
            CartItems: data,
          }
        }
      );

      response.status(200).json({
        message: "Cart item successfully added to user's cart",
        CartItems: [data],
      });
    } else {
      response.status(404).json({ message: "Owner ID not found. Failed to add item to cart", data });
    }
  } catch (error) {
    console.error("Error adding cart item to user's cart:", error);
    response.status(500).json({
      message: "Error adding cart item to user's cart",
      error: error.message,
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
