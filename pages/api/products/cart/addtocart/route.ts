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
       data,
    } = JSON.parse(request.body);


    const collection = db.collection("cart");

    const ownerId = await collection.findOne({ ownerId: data.ownerId });

    response.status(200).json({
      message: "ownerId" , ownerId,
  
    });


    if (ownerId) {
      await collection.updateOne(
        { ownerId:  ownerId   },
        {
          $push: {
            CartItems: [
              data
            ]
              ,
          },
        }
      );


      response.status(200).json({
        message: "Cart item successfully added to user's cart",
        CartItems: [data],
      });

    } else {
      response.status(404).json({ message: "Failed to add item/s to cart" , data});
    
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
