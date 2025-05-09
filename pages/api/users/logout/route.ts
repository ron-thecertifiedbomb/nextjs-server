import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import bcrypt from "bcrypt";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("users");

    const {
      username = "",
      lastLoggedIn = "",
      isLoggedIn = "",
    } = request.body;

    if (!username) {
      return response
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await collection.findOne({ username });

    if (!existingUser) {
      console.error("Username does not exist:", username);
      return response.status(409).json({ error: "Username does not exist" });
    }


    await collection.updateOne(
      { _id: existingUser._id },
      {
        $set: {
          lastLoggedIn: lastLoggedIn,
          isLoggedIn: isLoggedIn,
        },
      }
    );

    response.status(200).json({
      message: "Logout successful",
      firstName: existingUser.firstname,
      lastName: existingUser.lastname,
      userId: existingUser._id,
      isLoggedIn: isLoggedIn,
    });
  } catch (error: any) {
    console.error("Error during logout:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
