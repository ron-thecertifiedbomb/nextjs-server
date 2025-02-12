import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  let client;
  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const collection = db.collection("foodstorage");

    if (req.method === "GET") {
      const foodstorage = await collection.find({}).toArray();
      return res.status(200).json(foodstorage);
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (client) await client.close();
  }
}
