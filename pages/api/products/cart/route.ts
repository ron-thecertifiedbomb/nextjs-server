import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('cart');


    const {
      _id = '',
      name = '',
      CartItems = [
        {
          name: '',
          price: '',
          quantity: '',
          totalOrderPrice: '',
          quantityOrdered: '',
          isSelected: '',
          dateAdded: '',
          timeAdded: '',
        },
      ],
    } = JSON.parse(request.body);

    const cartData = {
      name,
      CartItems,
    };

    console.log('Data to be inserted to MongoDB Database', cartData);

    // Check if the item exists. If not, insert a new document.
    const existingItem = await collection.findOne({
      _id: new ObjectId(_id),
    });

    if (existingItem) {
      // Update existing item
      const updatedItem = await collection.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: cartData },
        { returnDocument: 'after' }
      );

      response.status(200).json({
        message: 'Cart item successfully updated',
        cartData: updatedItem.value,
      });
    } else {
      // Insert new item
      const newItem = await collection.insertOne({
        ...cartData,
        _id: new ObjectId(_id),
      });

      response.status(201).json({
        message: 'Cart item successfully added',
        cartData: newItem.ops[0],
      });
    }
  } catch (error) {
    console.error('Error inserting cart item:', error);
    response.status(500).json({ message: 'Error inserting Cart item', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
