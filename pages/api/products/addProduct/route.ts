import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { productData } from '../../../../data/data';

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('products');
    await Promise.all(productData.map(product => collection.insertOne(product)));

    response.status(201).json({ message: 'Products inserted successfully' });
  } catch (error) {
    console.error('Error inserting products:', error);
    response.status(500).json({ message: 'Error inserting products', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
