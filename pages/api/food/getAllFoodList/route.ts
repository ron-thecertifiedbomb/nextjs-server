import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';


export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('foodstorage');

    if (request.method === 'GET') {
      const foodstorage = await collection.find({}).toArray();
      response.status(200).json(foodstorage);
      console.log(foodstorage)
    }

  } catch (err) {
    console.log(err.stack);
    response.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}