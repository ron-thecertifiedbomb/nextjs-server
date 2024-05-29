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

    const existingItem = await collection.findOne({
      _id: ObjectId.createFromTime(cartData._id), 
    });

    if (!existingItem) {
      response.status(404).json({ message: 'Item not found' });
      return;
    }

    const cartDataToBeInserted = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromTime(cartData._id) },
      { $set: cartData.value },
      { returnDocument: 'after' }
    );

    // Assuming cartData is an array of items
    await Promise.all(cartData.map((item) => collection.insertOne(item)));

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
