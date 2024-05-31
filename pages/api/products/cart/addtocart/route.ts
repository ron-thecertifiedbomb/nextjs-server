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

    const { payload } = JSON.parse(request.body);

    console.log("Pay Load from front end ", payload.ownerId);
    console.log("Cart Data", payload.cartItems);

    if (!payload || !payload.ownerId) {
      console.error("Owner ID is missing in the request body");
      return response
        .status(400)
        .json({ message: "Owner ID is missing in the request body" });
    }

    const collection = db.collection("cart");

    const { ownerId, cartItems } = payload;

    const result = await collection.findOneAndUpdate(
      { ownerId: ownerId },
      {
        $push: {
          cartItems: { $each: cartItems },
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    if (result && result.value) {
      const updatedCartItems = result.value.cartItems;
      response.status(200).json({
        message: "Cart items successfully added to user's cart",
        cartItems: updatedCartItems,
      });
    } else {
      response.status(404).json({
        message: "Owner ID not found. Failed to add items to cart",
      });
    }
  } catch (error) {
    console.error("Error adding cart items to user's cart:", error);
    response.status(500).json({
      message: "Error adding cart items to user's cart",
      error: error.message,
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
