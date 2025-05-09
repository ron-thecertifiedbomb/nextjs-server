import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";
import { menu } from "../../../../data/data";

export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("menu");
    await Promise.all(menu.map((item) => collection.insertOne(item)));
    response.status(201).json({ message: "Menu added successfully" });
  } catch (error) {
    console.error("Error inserting menu:", error);
    response
      .status(500)
      .json({ message: "Error inserting menu", error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
