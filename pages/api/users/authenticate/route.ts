import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("users");

    const { username, password } = JSON.parse(request.body);

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await collection.findOne({ username });

    if (!existingUser) {
      console.error("Username does not exist:", username);
      return response.status(409).json({ error: "Username does not exist" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return response.status(400).json({ error: "Invalid password" });
    }

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };



    // const getCurrentTime = (): number => {
    //   return new Date().getTime();
    // };

    // const currentTime = getCurrentTime();

    // const result = await collection.findOneAndUpdate(
    //   {
    //     _id: existingUser._id
    //   },
    //   { $set: { lastLoggedIn: currentTime } },
    //   { returnDocument: "after" }
    // );


    //    if (!result.value) {
    //     throw new Error("Failed to update lastLoggedIn");
    //   }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    response.status(200).json({
      message: "Authentication successful",
      userId: existingUser._id,
      token,
    });
  } catch (error: any) {
    console.error("Error during login:", error);
    response.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (client) {
      client.close();
    }
  }
}
