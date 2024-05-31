import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  let client;

  try {
    client = await connectToDatabase();

    const db = client.db("storage");

    const body = JSON.parse(request.body);
    
    console.log("Full request body: ", body);

    const payload = body[1]; // Adjusting to access the payload correctly
    const { ownerId, cartItems } = payload;

    if (!ownerId || !cartItems) {
      console.error("Owner ID or Cart Items are missing in the request body");
      return response.status(400).json({ message: "Owner ID or Cart Items are missing in the request body" });
    }

    console.log("Owner ID: ", ownerId);
    console.log("Cart Items: ", cartItems);

    const collection = db.collection("cart");

    const result = await collection.findOneAndUpdate(
      { ownerId: new ObjectId(ownerId) },
      {
        $push: {
          cartItems: cartItems, // Make sure this is in the correct format expected by the DB
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
        message: "Cart item successfully added to user's cart",
        cartItems: updatedCartItems,
      });
    } else {
      response.status(404).json({
        message: "Owner ID not found. Failed to add item to cart",
      });
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
