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

    const { ownerId, orderId, productId, name, price, quantity, quantityOrdered, dateAdded, timeAdded } = body;

    const itemStocks = quantity


    const cartItems = {
      orderId,
      productId,
      name,
      price,
      quantityOrdered,
      dateAdded,
      timeAdded
    }


    if (!ownerId || !cartItems) {
      console.error("Owner ID or Cart Items are missing in the request body");
      return response.status(400).json({ message: "Owner ID or Cart Items are missing in the request body" });
    }


    const collection = db.collection('cart');
    const result = await collection.findOneAndUpdate(
      {  ownerId: new ObjectId(ownerId) },
      {
        $push: {
          cartItems: cartItems, 
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    if (result) {
      response.status(200).json({
        message: "Cart items successfully added to user's cart",
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






