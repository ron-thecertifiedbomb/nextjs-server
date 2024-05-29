import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    
    // Destructuring the request body with default values
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

    // Constructing the cartData object
    const cartData = {
      _id,
      name,
      CartItems,
    };

    // Accessing the collection
    const collection = db.collection('cart');

    console.log('Data to be inserted to MongoDB Database', cartData);

    // Creating ObjectId instance
    const objectId = new ObjectId(_id);

    // Checking if the item already exists
    const existingItem = await collection.findOne({ _id: objectId });

    if (existingItem) {
      // Update existing item, excluding _id from $set operation
      const updatedItem = await collection.findOneAndUpdate(
        { _id: objectId },
        { $set: { name, CartItems } }, // Do not include _id here
        { returnDocument: 'after' }
      );

      response.status(200).json({
        message: 'Cart item successfully updated',
        cartData: updatedItem.value,
      });
    } else {
      // Insert new item
      const newItem = await collection.insertOne({
        _id: objectId,
        name,
        CartItems,
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
