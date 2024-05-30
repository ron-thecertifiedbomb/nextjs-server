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

    const  ownerId  = request.body;
    console.log("Owner ID:", ownerId);

    if (!ownerId) {
      console.error("Owner ID is missing in the request body");
      return response.status(400).json({ message: "Owner ID is missing in the request body" });
    }

    const {productId, name, price, quantity, totalOrderPrice, quantityOrdered, isSelected, dateAdded, timeAdded } = request.body;

    const collection = db.collection("cart");

    const owner = await collection.findOne({ ownerId: ownerId });

    if (owner) {
      const newItem = {
        cartId: new ObjectId(),
        ownerId,
        productId,
        name,
        price,
        quantity,
        totalOrderPrice,
        quantityOrdered,
        isSelected,
        dateAdded,
        timeAdded
      };

      await collection.updateOne(
        { ownerId: ownerId },
        {
          $push: {
            CartItems: newItem,
          }
        }
      );

      response.status(200).json({
        message: "Cart item successfully added to user's cart",
        CartItems: [newItem],
      });
    } else {
      response.status(404).json({ message: "Owner ID not found. Failed to add item to cart", data: request.body });
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
