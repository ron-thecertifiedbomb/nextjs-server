import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const body = JSON.parse(request.body);
    console.log("Request body: ", body);

    const { ownerId, orderId, productId, name, price, quantityOrdered, dateAdded, timeAdded } = body;

    if (!ownerId || !orderId || !productId || !name || !price || !quantityOrdered || !dateAdded || !timeAdded) {
      console.error("Required fields are missing in the request body");
      return response.status(400).json({ message: "Required fields are missing in the request body" });
    }

    const collection = db.collection('cart');

    // Check if the product already exists in the cart
    const existingCartItem = await collection.findOne({ ownerId: new ObjectId(ownerId), "cartItems.productId": productId });

    if (existingCartItem) {
      // If the product exists, update its quantity and price
      await collection.updateOne(
        { ownerId: new ObjectId(ownerId), "cartItems.productId": productId },
        {
          $inc: {
            "cartItems.$.quantityOrdered": quantityOrdered,
          },
          $set: {
            "cartItems.$.price": price, // Update price
            "cartItems.$.dateAdded": dateAdded, // Update date added
            "cartItems.$.timeAdded": timeAdded, // Update time added
          }
        }
      );
    } else {
      // If the product doesn't exist, push it into the cartItems array
      const cartItem = {
        orderId,
        productId,
        name,
        price,
        quantityOrdered,
        dateAdded,
        timeAdded
      };

      await collection.updateOne(
        { ownerId: new ObjectId(ownerId) },
        {
          $push: {
            cartItems: cartItem,
          },
        },
        { upsert: true }
      );
    }

    response.status(200).json({
      message: "Cart item successfully added to user's cart",
    });
    
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
