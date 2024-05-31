import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    const ownerId = request.query._id as string;
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('cart');

 
    const cartItem = await collection.findOne({ ownerId: new ObjectId(ownerId) });

    if (!cartItem) {
      response.status(404).json({ message: 'Cart item not found' });
      return;
    }

    if (request.method === 'GET') {

      response.status(200).json(cartItem);
      console.log('Cart items:', cartItem);
    }
  } catch (err) {
    console.error('Error:', err);
    response.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
