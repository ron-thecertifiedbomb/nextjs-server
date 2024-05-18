import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";

// Cache for storing the fetched documents
const cache: Record<string, { data: any[]; timestamp: number }> = {};

// Cache expiration time in milliseconds (e.g., 1 hour)
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    const { name } = request.query;

    // Generate a unique cache key based on the request parameters
    const cacheKey = Array.isArray(name) ? name.join("_") : String(name);

    // Check if data is already cached and not expired
    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_EXPIRATION_TIME) {
      return response.status(200).json(cache[cacheKey].data);
    }

    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("users");

    if (typeof name !== "string") {
      return response
        .status(400)
        .json({ message: "Missing or invalid name parameter" });
    }

    let filter = {};
    if (name && name !== "All") { // Check if name is not "All"
      filter = { name };
    }

    const documents = await collection.find(filter).toArray();

    if (documents.length === 0) {
      return response.status(404).json({ message: "No documents found" });
    }

    // Cache the fetched documents along with the timestamp
    cache[cacheKey] = { data: documents, timestamp: Date.now() };

    response.status(200).json(documents);
  } catch (error) {
    console.error("Database query error:", error);

    // Clear cache in case of error
    const { name } = request.query;
    const cacheKey = Array.isArray(name) ? name.join("_") : String(name);
    delete cache[cacheKey];

    response.status(500).json({ message: "An internal server error occurred" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
