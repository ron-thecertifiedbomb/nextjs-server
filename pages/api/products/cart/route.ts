import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const cartData = JSON.parse(request.body);
    const collection = db.collection('cart');

    console.log('Data to be inserted to MongoDB Database', cartData);

    const existingItem = await collection.findOne({
      _id: new ObjectId(cartData._id),
    });

    if (!existingItem) {
      response.status(404).json({ message: 'Item not found' });
      return;
    }

    const cartDataToBeInserted = await collection.findOneAndUpdate(
      { _id: new ObjectId(cartData._id) },
      { $set: cartData },
      { returnDocument: 'after', upsert: true }
    );

    response.status(201).json({
      message: 'Cart item successfully added',
      cartDataToBeInserted: cartDataToBeInserted.value,
    });
  } catch (error) {
    console.error('Error inserting products:', error);
    response.status(500).json({ message: 'Error inserting Cart item', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
