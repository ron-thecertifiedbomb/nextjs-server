import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';


export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('products');

    if (request.method === 'GET') {
      const products = await collection.find({}).toArray();
      response.status(200).json(products);
      console.log(products)
    }

  } catch (err) {
    console.log(err.stack);
    response.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}