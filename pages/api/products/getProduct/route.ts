import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    const productName = request.query.productName as string;
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('products');

    const product = await collection.findOne({ productName });

    if (!product) {
      response.status(404).json({ message: 'Product not found' });
      return;
    }

    response.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    response.status(500).json({ message: 'Error fetching product', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
