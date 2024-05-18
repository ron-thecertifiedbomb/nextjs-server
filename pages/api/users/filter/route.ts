import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("users");

    const { filterKey, filterValue } = request.query;

    if (typeof filterKey !== "string" || typeof filterValue !== "string") {
      return response
        .status(400)
        .json({ message: "Missing or invalid filterKey or filterValue" });
    }

    const filter = {
      arrayField: {
        $elemMatch: {
          [filterKey]: filterValue,
        },
      },
    };

    const documents = await collection.find(filter).toArray();

    if (documents.length === 0) {
      return response.status(404).json({ message: "No documents found" });
    }

    response.status(200).json(documents);
  } catch (error) {
    console.error("Database query error:", error);
    response.status(500).json({ message: "An internal server error occurred" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
