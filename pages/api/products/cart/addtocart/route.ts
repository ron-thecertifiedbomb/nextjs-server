import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../../dbConfig/dbConfig";


export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");

    const {
      CartItems: [data],
    } = JSON.parse(request.body);

    const collection = db.collection("cart");

    const userCart = await collection.findOne({ ownerId: data._id });

    if (userCart) {
      await collection.updateOne(
        { ownerId: data._id  },
        {
          $push: {
            CartItems: [data],
          },
        }
      );

      response.status(200).json({
        message: "Cart item successfully added to user's cart",
        CartItems: [data],
      });

    } else {
     
      response.status(404).json({ message: "User's cart not found" });
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
